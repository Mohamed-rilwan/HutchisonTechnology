import db from "../../db.db.js";

export const getItem = (id) => {
  try {
    const dog = db?.dogs?.filter((dog) => dog.id == parseInt(id)[0]);
    return dog;
  } catch (error) {
    throw error;
  }
};


export const listItem = () => {
    try {
      const dog = db?.dogs
      return dog;
    } catch (error) {
      throw error;
    }
  };
  

  export const editItem = (id, data) => {
    try {
        const index = db.dogs.findIndex(dog => dog.id === parseInt(id))

        if (index === -1) throw new Error('Dog not found')
        else {
            data.id = parseInt(data.id)
            db.dogs[index] = data
            return db.dogs[index]
        }
    } catch (err) {
        console.error('Error', err)
        return err
    }
}

export const addItem = data => {
  try {
      const newDog = { id: db.dogs.length + 1, ...data }
      db.dogs.push(newDog)
      return newDog
  } catch (err) {
      console.error('Error', err)
      return err
  }
}

export const deleteItem = id => {
  try {
      const index = db.dogs.findIndex(dog => dog.id === parseInt(id))

      if (index === -1) throw new Error('Dog not found')
      else {
          db.dogs.splice(index, 1)
          return db.dogs
      }
  } catch (err) {
      console.error('Error', err)
      return err
  }
}