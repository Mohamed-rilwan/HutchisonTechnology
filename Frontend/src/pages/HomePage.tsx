import * as React from "react";
import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  Typography,
  Collapse,
} from "@mui/material";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddDogs from "../components/AddDogs";
import HomeIcon from "@mui/icons-material/Home";

function Home() {
  const [addNewBreed, setAddNewBreed] = React.useState<boolean>(false);
  const { dogList } = React.useContext(GlobalContext);
  let navigate = useNavigate();

  const handleDogSelection = (value: string | null) => {
    if (value) {
      navigate(`/${value}`);
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          width: "75%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        {addNewBreed && (
          <HomeIcon
            sx={{
              position: "absolute",
              top: 30,
              right: 30,
              fontSize: 40,
              cursor: "pointer",
            }}
            onClick={() => setAddNewBreed(false)}
          />
        )}
        <Collapse in={!addNewBreed} timeout={500}>
          <Stack spacing={2} alignItems="center">
            <Typography
              variant="h3"
              component="div"
              fontWeight="500"
              color="textDisabled"
            >
              Welcome to the Dog Breed Explorer!
            </Typography>
            <Autocomplete
              disablePortal
              options={Object.keys(dogList || {})}
              sx={{ width: 300 }}
              clearIcon={<ClearIcon fontSize="small" />}
              onChange={(event, value) => handleDogSelection(value)}
              renderInput={(params) => (
                <TextField {...params} label="See Dog Breeds" />
              )}
            />

            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="h6"
                component="div"
                fontWeight="500"
                color="textDisabled"
              >
                Add New Breed
              </Typography>
              <AddCircleIcon
                color="primary"
                fontSize="large"
                onClick={() => setAddNewBreed(true)}
                sx={{ cursor: "pointer" }}
              />
            </Stack>
          </Stack>
        </Collapse>

        {addNewBreed && <AddDogs newBreed />}
      </Box>
    </React.Fragment>
  );
}

export default Home;
