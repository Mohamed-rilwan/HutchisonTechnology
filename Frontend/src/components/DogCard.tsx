import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useState, useEffect } from "react";

const defaultImagePath = "/assets/default.png";

interface SubbreedProp {
  breed: string;
  subbreed: string;
  handleDelete: () => Promise<void>;
}

export default function DogCard(props: SubbreedProp) {
  const { breed, subbreed, handleDelete } = props;
  const [dogImage, setDogImage] = useState<string>(defaultImagePath);

  useEffect(() => {
    const fetchDogImages = async () => {
      try {
        //Using a open API for dog images
        const response = await fetch(
          `https://dog.ceo/api/breed/${breed.trim()}/${subbreed.trim()}/images`
        );
        const data = await response.json();

        if (data.status === "success" && data.message.length > 0) {
          const randomImage =
            data.message[Math.floor(Math.random() * data.message.length)];
          setDogImage(randomImage);
        } else {
          setDogImage(defaultImagePath);
        }
      } catch (err) {
        console.error(err);
        setDogImage(defaultImagePath);
      }
    };

    fetchDogImages();
  }, [breed, subbreed]);

  return (
    <Card sx={{ display: "flex", width: "400px", border: "1px solid #8888" }}>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="h5"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            {subbreed.toUpperCase()}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton color="error" onClick={handleDelete}>
            <RemoveCircleIcon />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 150, height: 150 }}
        image={dogImage}
        alt={`${subbreed} image`}
      />
    </Card>
  );
}
