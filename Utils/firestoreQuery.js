import firestore from '@react-native-firebase/firestore';

export const singleQuery = (collectionName, objectId) => {
  return firestore().collection(collectionName).doc(objectId).get()
};

export const collectionQuery = (collectionName) => {
  return firestore().collection(collectionName).get()
};

export const collectionQueryFilter = (collectionName, filter) => {
  return firestore().collection(collectionName).where(filter).get()
};

export const collectionQueryMapping = (collectionName, mapFunction) => {
  return firestore().collection(collectionName).get().then(querySnapshot => {
    mapFunction(querySnapshot)
  });
};

export const collectionQueryFilterMapping = (collectionName, filter, mapFunction) => {
  return firestore().collection(collectionName).where(filter).get().then(querySnapshot => {
    mapFunction(querySnapshot)
  });
};

export const collectionQueryFilterMappingSnapshot = (collectionName, filter, mapFunction) => {
  console.log('-------_FILTER-----------', filter)
  return firestore().collection(collectionName).where(filter).onSnapshot(querySnapshot => {
    mapFunction(querySnapshot)
  });
};