import React, { useState, createContext, useEffect, ReactNode } from "react";
import { Dog } from "../types";
import { listAllDogs } from "../services/DogListService";

interface GlobalContextType {
  dogList: Dog | undefined;
  setDogList: (dogs: Dog) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  dogList: undefined,
  setDogList: () => {},
});

interface GlobalContextProviderProps {
  children: ReactNode;
}

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [dogList, setDogList] = useState<Dog | undefined>(undefined);

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
