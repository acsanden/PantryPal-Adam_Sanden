/*
 * File: PantryPal/LogInStorage.ts
 * Description: Firebase Auth storage functions for exiting/new users
*/

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

let userId: string;

export const getUserId = async () => {
  userId = (await AsyncStorage.getItem('userId')) as string;
  return userId;
};

export const logIn = async (email: string, password: string) => {
    try {
      const userCred = await auth().signInWithEmailAndPassword(email, password);
      userId = userCred.user.uid;
      await AsyncStorage.setItem('userId', userId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
};

export const signUp = async (email: string, password: string) => {
    try {
      const userCred = await auth().createUserWithEmailAndPassword(email, password);
      userId = userCred.user.uid;
      await AsyncStorage.setItem('userId', userId);
      await firestore().collection('users').doc( userId).set({email: email,});
      return true;
    } catch (error) {
      console.log(error);
      /*https://stackoverflow.com/questions/70996401/firebase-the-email-address-is-already-in-use-by-another-account-auth-email-al*/
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Account already exists');
      } else if (error.code == "auth/invalid-email") {
        throw new Error("The email address is not valid.");
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password too weak');
      } else {
        throw new Error('Something went wrong');
      }
    }
};

