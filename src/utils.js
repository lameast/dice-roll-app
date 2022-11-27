//Get a random integer between 0 and max
const getRandomInt = (max) => {
    const min = 1;
    return Math.floor(Math.random()*(max- min + 1)) + min;
}

//Check if item is in a given array
const isArrayInArray = (arr, item) => {
    let itemAsString = JSON.stringify(item);
  
    let contains = arr.some((ele) => {
      return JSON.stringify(ele) === itemAsString;
    });
    return contains;
}

export {getRandomInt, isArrayInArray};