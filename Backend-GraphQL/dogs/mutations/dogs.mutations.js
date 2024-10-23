import { editItem, addItem, deleteItem } from "../models/dogs.models.js";

export const addDog = (dogToAdd) => {
  try {
    const response = addItem(dogToAdd);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editDog = (dogToEdit) => {
  try {
    const response = editItem(dogToEdit?.id, dogToEdit);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteDog = (id) => {
  try {
    const response = deleteItem(id);
    return response;
  } catch (error) {
    throw error;
  }
};
