import firestore from '@react-native-firebase/firestore';

export const singleQuery = (collectionName, objectId) => {
  return firestore().collection(collectionName).doc(objectId).get()
};

export const collectionQuery = (collectionName) => {
  return firestore().collection(collectionName).get()
};

export const collectionQueryMapping = (collectionName, mapFunction) => {
  return firestore().collection(collectionName).onSnapshot(querySnapshot => {
    mapFunction(querySnapshot)
  });
};