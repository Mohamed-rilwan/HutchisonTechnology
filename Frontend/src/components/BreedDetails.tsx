import * as React from "react";
import {
  Box,
  createTheme,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddDogs from "./AddDogs";
import DogCard from "./DogCard";
import { useContext, useEffect } from "react";
import { listAllDogs } from "../services/DogListService";

const theme = createTheme({});

const BreedDetails = () => {
  const { dogList, setDogList } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { breed } = useParams();

  useEffect(() => {
    const fetchDogList = async () => {
      try {
        const response = await listAllDogs();
        setDogList(response);
      } catch (error) {
        console.error("Failed to fetch dog list:", error);
      }
    };

    if (!dogList) {
      fetchDogList();
    }
  }, [dogList, setDogList]);

  if (!dogList) {
    return <div>Loading...</div>;
  }

  const breedDetails = dogList[breed!];

  if (!breedDetails) {
    return <div>Breed not found.</div>;
  }

  return (
    <div>
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
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Typography variant="h3" color="textDisabled" component="div">
                {breed?.toUpperCase()}
              </Typography>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                sx={{ flexWrap: "wrap" }}
              >
                {dogList![breed!].map((item, index) => (
                  <DogCard subbreed={item} breed={breed!} />
                ))}
              </Stack>

              <AddDogs newBreed={false} breed={breed} />
            </Stack>
          </Box>
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
};

export default BreedDetails;
