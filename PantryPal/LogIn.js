import React, { useState, useEffect  } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { getUserId, logIn, signUp } from './UserStorage';
import styles from './Styles.js';
import image1 from './Images/sisters-pantry-backround.jpg';
import image2 from './Images/pantrypal.jpg';

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {checkLoggedIn();}, []);

  const checkLoggedIn = async () => {
    const userId = await getUserId();
    if (userId) {navigation.navigate('Home Screen');}
  };

  const handleLogIn = async () => {
    if (!password) {
      setError('Please input a password');
      return;
    }
    const success = await logIn(email, password);
    if (success) {navigation.navigate('Home Screen');} 
    else {setError('Email or password incorrect');}
  };

  const handleSignUp = async () => {
    if (!password) {
      setError('Please input a password');
      return;
    }
    try {
      const success = await signUp(email, password);
      if (success) {navigation.navigate('Home Screen');} 
    } catch (error) {
      setError(error.message);
    }
  };

  /* source: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript */
  const validateEmail = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Wrong email format');
      return false;
    }
    return true;
  };

  return (
    <ImageBackground
      source={image1}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}       
    >
        <View style={[styles.container, { marginTop: 75 }]}>
        <Image
          source={image2}
          style={{ width: 350, height: 200, resizeMode: 'contain'}}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={[styles.container, {marginTop: 50}]}>
  
          <TextInput
            style={styles.textBox3} 
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textBox3} 
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {error !== '' && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity onPress={() => {
            if (validateEmail()) {handleLogIn();}
            }} style={[styles.logInButton, {marginTop: 80}]}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            if (validateEmail()) {handleSignUp();}
            }} style={[styles.signUpButton, {marginTop: 20}]}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>

      </View>
    </ImageBackground>
  );
};

export default LogIn;
