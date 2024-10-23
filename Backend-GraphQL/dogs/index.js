// import { addDog, editDog, deleteDog } from "mutations/dogs.mutations.js";
// import { listDogs, getDogs } from "queries/dogs.mutation.js";

export const typeDefs = `#graphql
# OBJECT TYPES 
# This "Dog" type defines the queryable fields for each dog breed in the data type 
type Dog {
    id: ID!
    name: String!
    subBreeds: [SubBreed]  # Only sub-breeds, no deeper nesting
}

type SubBreed {
    id: ID!
    name: String!
}

# INPUT TYPES
# Define the input object for addDog and editDog mutation
input BreedToAdd {
    id: ID!
    name: String!
}

input BreedToEdit {
    id: ID!
    name: String!
}

# QUERY TYPES
type Query {
    dogs: [Dog]
    dog(id: ID!): Dog
    dogByName(name: String!): Dog
}

# MUTATION TYPES
type Mutation {
    addDog(breedToAdd: BreedToAdd!): Dog
    editDog(breedToEdit: BreedToEdit!): Dog
    deleteDog(id: ID!): [Dog]
}
`;

export const resolvers = {
    // Resolvers for Queries
    Query: {
      dogs: () => listDogs(),
      dog: (_, { id }) => getDogs(id),
      dogByName: (_, { name }) => getDogs(name),
    },
  
    Mutation: {
      addDog: (_, { breedToAdd }) => addDogs(breedToAdd),
      editDog: (_, { breedToEdit }) => editDogs(breedToEdit),
      deleteDog: (_, { id }) => deleteDogs(id),
    },
  };
  
