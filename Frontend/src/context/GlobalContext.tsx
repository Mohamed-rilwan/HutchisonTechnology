import React, { useState, createContext, useEffect, ReactNode } from "react";
import { Dog } from "../types";
import { listAllDogs } from "../services/DogListService";

interface GlobalContextType {
  dogList: Dog;
  setDogList: React.Dispatch<React.SetStateAction<Dog>>;
}

export const GlobalContext = createContext<GlobalContextType>({
  dogList: {},
  setDogList: () => {},
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [dogList, setDogList] = useState<Dog>({});

  useEffect(() => {
    const fetchDogDetails = async () => {
      try {
        const dogsData = await listAllDogs();
        setDogList(dogsData);
      } catch (error) {
        console.error("Error fetching dog details:", error);
      }
    };

    fetchDogDetails();
  }, []);

  return (
    <GlobalContext.Provider value={{ dogList, setDogList }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
