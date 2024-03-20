import AsyncStorage from '@react-native-async-storage/async-storage';

const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Error in removing item from local-storage', e);
    throw e;
  }
};

const getItem = async key => {
  try {
    const result = await AsyncStorage.getItem(key);
    return result;
  } catch (e) {
    console.log('Error in retrieving item from local-storage', e);
    throw e;
  }
};

const getMultipleItems = async (keys = []) => {
  try {
    let values = await AsyncStorage.multiGet([...keys]);
    return values;
  } catch (e) {
    console.log('Error >> ', e);
    throw e;
  }
};

const setItem = async (key, value) => {
  try {
    console.log("setItem",value.length)
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(`Error in storing the key: ${key}`);
    throw e;
  }
};

const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(`Error in clearing the Local storage`);
    throw e;
  }
};

const getAllKeys = async () => {
  try {
    let keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const removeMultipleItems = async keys => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const setLargeItem = async (keySuffix, itemsArr) => {
  try {
    // to split the large array to N chunks
    function splitToChunks(array, parts) {
      let result = [];
      for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
      }
      return result;
    }

    // perform array split
    let chunksNo = 5;
    const newArr = splitToChunks(itemsArr, chunksNo); // 2d array

    // to be stored
    const inArr = []; // 2d array [[key, val], ...]
    for (let i = 1; i <= chunksNo; i++) {
      inArr.push([`${i}-${keySuffix}`, JSON.stringify(newArr[i - 1])]);
    }

    // date key
    const dateBody = JSON.stringify({
      data: [],
      date: new Date().toString(),
    });

    // store
    await AsyncStorage.multiSet(inArr);
    await AsyncStorage.setItem(keySuffix, dateBody);
  } catch (e) {
    console.log('Error occured while multisetting the large item', e);
    throw e;
  }
};

const getLargeItem = async keySuffix => {
  //getMultipleItems
  try {
    const keys = await getAllKeys();
    const neededKeys = keys.filter(k => k.includes(`-${keySuffix}`));

    let values = await AsyncStorage.multiGet(neededKeys);
    let header = await AsyncStorage.getItem(keySuffix);

    var newArr = [];

    for (var i = 0; i < values.length; i++) {
      newArr = newArr.concat(JSON.parse(values[i][1]));
    }

    // console.log(newArr);
    // console.log(header);

    return {
      ...JSON.parse(header),
      data: newArr,
    };
  } catch (e) {
    console.log('Error while retrieiving large item');
    throw e;
  }
};

console.log('----------------------------------------------------------------');
export {
  removeItem,
  getAllKeys,
  getItem,
  setItem,
  clearLocalStorage,
  setLargeItem,
  getLargeItem,
};
export default {
  removeItem,
  getItem,
  setItem,
  clearLocalStorage,
  getAllKeys,
  setLargeItem,
  getLargeItem,
};
