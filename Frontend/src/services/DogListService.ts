import { Dog } from "../types";

const BASE_URL = 'https://hutchisontechnology.onrender.com' ;

/**
 * Fetches all dogs from the server.
 * @returns A Promise that resolves to an array of dogs breeds.
 */
export const listAllDogs = async (): Promise<Dog> => {
  try {
    const response = await fetch(`${BASE_URL}/api/list`);
    if (!response.ok) {
      throw new Error(`Failed to fetch dogs list: ${response.status} - ${response.statusText}`);
    }
    const data: Dog = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch dogs list: ${error.message}`);
  }
};


/**
 * Add a new dog breed.
 * @param breed The new breed to add.
 * @returns A Promise that resolves to the JSON response from the server.
 * @throws An error if the request fails.
 */
export const addNewDogBreed = async (breed: string, subbreeds: string[]) => {
  try {
    const response = await fetch(`${BASE_URL}/api/add/${breed}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subbreeds),
    });
    if (!response.ok) {
      throw new Error(`Failed to add new dog breed: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (error: any) {
    throw new Error(`Failed to add new dog breed: ${error.message}`);
  }
};


/**
 * Update sub breed for dog.
 * @param breed The breed to update.
 * @returns A Promise that resolves to the JSON response from the server.
 * @throws An error if the request fails.
 */
export const updateDogBreed = async (breed: string, subbreeds: string[]) => {
  try {
    const response = await fetch(`${BASE_URL}/api/${breed}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subbreeds),
    });
    if (!response.ok) {
      throw new Error(`Failed to update dog breed: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (error: any) {
    throw new Error(`Failed to update dog breed: ${error.message}`);
  }
};



/**
 * Delete a sub breed for dog.
 * @param breed The breed to update.
 * @param subbreed The subbreed to delete.
 * @returns A Promise that resolves to the JSON response from the server.
 * @throws An error if the request fails.
 */
export const deleteDogSubbreed = async (breed: string, subbreed: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/${breed}/${subbreed}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete dog subbreed: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (error: any) {
    throw new Error(`Failed to delete dog subbreed: ${error.message}`);
  }
};