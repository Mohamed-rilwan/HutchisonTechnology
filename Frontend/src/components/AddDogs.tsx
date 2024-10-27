import {
  Alert,
  Button,
  Chip,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import SaveIcon from "@mui/icons-material/Save";
import { addNewDogBreed, updateDogBreed } from "../services/DogListService";

interface Subbreed {
  id: number;
  name: string;
}

const vertical = "bottom";
const horizontal = "center";

export default function AddDogs({
  newBreed,
  breed,
}: {
  newBreed: boolean;
  breed?: string;
}) {
  const [subbreeds, setSubbreeds] = useState<Subbreed[]>([]);
  const [newSubBreed, setSubNewbreed] = useState<string>("");
  const [dogBreed, setDogBreed] = useState<string>(breed || "");
  const [showStatus, setShowStatus] = useState<boolean>(false);

  const addSubbreed = () => {
    setSubbreeds((prev) => [
      ...prev,
      { id: prev.length + 1, name: newSubBreed.trim() },
    ]);
    setSubNewbreed("");
  };

  const removeSubbreed = (id: number) => {
    setSubbreeds((prev) => prev.filter((subbreed) => subbreed.id !== id));
  };

  const handleSave = async () => {
    if (newBreed) {
      var response = await addNewDogBreed(
        dogBreed,
        subbreeds.map((subbreed) => subbreed.name)
      );

      if (response.breed === dogBreed) {
        setDogBreed("");
        setSubNewbreed("");
        setSubbreeds([]);
        setShowStatus(true);
      }
    } else {
      var updateResponse = await updateDogBreed(
        dogBreed,
        subbreeds.map((subbreed) => subbreed.name)
      );

      if (updateResponse.breed === dogBreed) {
        setSubNewbreed("");
        setSubbreeds([]);
        setShowStatus(true);
      }
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={showStatus}
        autoHideDuration={2000}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {newBreed ? "Added Dog breed." : "Updated Dog Breed."}
        </Alert>
      </Snackbar>

      {newBreed && (
        <>
          <Typography
            variant="h3"
            component="div"
            fontWeight="500"
            color="textDisabled"
          >
            Add a new Dog Breed
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter breed name"
            fullWidth
            margin="normal"
            value={dogBreed}
            onChange={(e) => setDogBreed(e.target.value)}
          />
        </>
      )}
      {subbreeds.length > 0 && (
        <Typography
          sx={{ marginTop: "2%" }}
          variant="h5"
          component="div"
          fontWeight="500"
          color="textDisabled"
        >
          Sub-Breed
        </Typography>
      )}
      <Stack sx={{ margin: "2%" }} direction="row" spacing={1}>
        {subbreeds.map((item, index) => (
          <Chip
            label={item.name}
            variant="outlined"
            onDelete={() => removeSubbreed(item.id)}
            color="primary"
            icon={<PetsIcon />}
          />
        ))}
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          variant="outlined"
          placeholder="Add sub-breed name"
          value={newSubBreed}
          onChange={(e) => setSubNewbreed(e.target.value)}
        />
        <IconButton
          disabled={!newSubBreed}
          color="primary"
          onClick={addSubbreed}
        >
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Stack>
      <Button
        disabled={!dogBreed}
        sx={{ marginTop: "2%" }}
        variant="contained"
        color="primary"
        endIcon={<SaveIcon fontSize="large" />}
        onClick={handleSave}
      >
        Save
      </Button>
    </>
  );
}
