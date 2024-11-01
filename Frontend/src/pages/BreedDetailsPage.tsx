import * as React from "react";
import {
  Alert,
  Box,
  createTheme,
  Snackbar,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddDogs from "../components/AddDogs";
import DogCard from "../components/DogCard";
import { useContext, useEffect, useState } from "react";
import { deleteDogSubbreed, listAllDogs } from "../services/DogListService";
import SimpleBackdrop from "../components/Loader";

const theme = createTheme({});

const BreedDetails = () => {
  const { dogList, setDogList } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { breed } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [showStatus, setShowStatus] = useState("");

  useEffect(() => {
    const fetchDogList = async () => {
      try {
        const response = await listAllDogs();
        setDogList(response);
      } catch (error) {
        console.error("Failed to fetch dog list:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!dogList) {
      fetchDogList();
    } else {
      setLoading(false);
    }
  }, [dogList, setDogList]);

  const breedDetails = dogList[breed!];

  if (!breedDetails) {
    return <div>Breed not found.</div>;
  }

  const handleSubbreedDelete = async (breed: string, subbreed: string) => {
    setLoading(true);
    try {
      const response = await deleteDogSubbreed(breed, subbreed);

      if (response.message === "Sub-breed deleted successfully") {
        setDogList((prevDogList) => {
          if (!prevDogList) return prevDogList;
          const updatedBreedList =
            prevDogList[breed]?.filter((item) => item !== subbreed) || [];
          return {
            ...prevDogList,
            [breed]: updatedBreedList,
          };
        });
      } else {
        setShowStatus("Failed to delete sub-breed. Try after sometime");
      }
    } catch (error) {
      console.error("Error deleting sub-breed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <SimpleBackdrop />}
      {
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={showStatus !== ""}
          autoHideDuration={2000}
          onClose={() => setShowStatus("")}
        >
          <Alert
            onClose={() => setShowStatus("")}
            severity="success"
            sx={{ width: "100%" }}
          >
            {showStatus}
          </Alert>
        </Snackbar>
      }
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <HomeIcon
            sx={{
              position: "absolute",
              top: 30,
              right: 30,
              fontSize: 40,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
          <Box
            sx={{
              width: "75%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "50vh",
              justifyContent: "flex-start",
              paddingTop: "10%",
            }}
          >
            <Typography
              variant="h3"
              color="textDisabled"
              component="div"
              sx={{
                paddingBottom: "2%",
                animation: "fadeInScale 1.2s ease-in-out",
                transformOrigin: "center",
                "&:hover": {
                  color: "primary.main",
                  textShadow: "0px 0px 8px rgba(0,0,0,0.3)",
                },
                "@keyframes fadeInScale": {
                  "0%": {
                    opacity: 0,
                    transform: "scale(0.8)",
                  },
                  "100%": {
                    opacity: 1,
                    transform: "scale(1)",
                  },
                },
              }}
            >
              {breed?.toUpperCase()}
            </Typography>

            <Stack
              spacing={2}
              direction="row"
              useFlexGap
              sx={{
                paddingTop: "5%",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {dogList![breed!].length === 0 && (
                <Typography
                  variant="h5"
                  component="div"
                  fontWeight="500"
                  color="textDisabled"
                >
                  No Sub-Breed available
                </Typography>
              )}
              {dogList![breed!].map((item, index) => (
                <DogCard
                  key={index}
                  subbreed={item}
                  breed={breed!}
                  handleDelete={() => handleSubbreedDelete(breed!, item)}
                />
              ))}
            </Stack>

            <AddDogs
              newBreed={false}
              breed={breed}
              subbreed={dogList![breed!].map((item, index) => ({
                id: index,
                name: item,
              }))}
            />
          </Box>
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
};

export default BreedDetails;
