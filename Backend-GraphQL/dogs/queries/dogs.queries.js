import { getItem, listItem } from "../models/dogs.models.js";

export const getDogs = (id) => {
  try {
    const response = getItem(id);
    return response;
  } catch (err) {
    throw err;
  }
};

export const listDogs = () => {
  try {
    const response = listDogs();
    return response;
  } catch (err) {
    throw err;
  }
};
