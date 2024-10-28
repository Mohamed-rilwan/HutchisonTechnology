import {
  Alert,
  Button,
  Chip,
  Divider,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useContext, useState } from "react";
import PetsIcon from "@mui/icons-material/Pets";
import SaveIcon from "@mui/icons-material/Save";
import { addNewDogBreed, updateDogBreed } from "../services/DogListService";
import { GlobalContext } from "../context/GlobalContext";
import { SubbreedProps } from "../types";

export default function AddDogs({
  newBreed,
  breed,
}: {
  newBreed: boolean;
  breed?: string;
  subbreed?: SubbreedProps[];
}) {
  const { dogList, setDogList } = useContext(GlobalContext);
  const [subbreeds, setSubbreeds] = useState<SubbreedProps[]>([]);
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
    const subbreedToSave = newBreed
      ? subbreeds.map((subbreed) => subbreed.name)
      : [
          ...(dogList![dogBreed] || []),
          ...subbreeds.map((subbreed) => subbreed.name),
        ];

    let response;
    if (newBreed) {
      response = await addNewDogBreed(dogBreed, subbreedToSave);
    } else {
      response = await updateDogBreed(dogBreed, subbreedToSave);
    }

    if (response.breed === dogBreed) {
      setSubNewbreed("");
      setSubbreeds([]);
      setShowStatus(true);
      setDogList((prev) => ({ ...prev, [dogBreed]: subbreedToSave }));
      if (newBreed) {
        setDogBreed("");
      }
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showStatus}
        autoHideDuration={2000}
        onClose={() => setShowStatus(false)}
      >
        <Alert
          onClose={() => setShowStatus(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
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
        <Divider sx={{ width: "50vw", paddingTop: "2%" }}>
          <Chip
            color="success"
            variant="outlined"
            label={
              newBreed
                ? "Sub-Breed"
                : "Newly Added Sub-Breed" + " (Save before closing)"
            }
            size="small"
          />
        </Divider>
      )}
      <Stack sx={{ margin: "2%" }} direction="row" spacing={1}>
        {subbreeds.map((item, index) => (
          <Chip
            id={`${index}`}
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
        sx={{ margin: "2% 0 2% 0" }}
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
