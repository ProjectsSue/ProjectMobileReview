import firestore from '@react-native-firebase/firestore';

export const createObject = (collectionName, data) => {
  return firestore().collection(collectionName).add(data)
};

export const updateObject = (collectionName, objectId, data) => {
  return firestore().collection(collectionName).doc(objectId).update(data)
};

export const deleteObject = (collectionName, objectId) => {
  return firestore().collection(collectionName).doc(objectId).delete()
};