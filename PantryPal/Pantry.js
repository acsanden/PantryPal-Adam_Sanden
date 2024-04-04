/*
 * File: PantryPal/Pantry.js
 * Description: This is the Pantry screen
 * It allows the user to add, edit, and delete items from the pantry.
 * It is accessed from the HomeScreen.
 */

import React, { useEffect, useState } from "react";
import {Button, FlatList,TouchableOpacity, ImageBackground, Modal, RefreshControl, Text, View, ActivityIndicator} from "react-native";
import {loadPantryData, deleteItem} from './PantryStorage.ts';  // storage methods 
import Snackbar from "react-native-snackbar";
import image from './Images/pantryimage.jpg';     // backround image
import styles from './Styles.js';

/* Pantry Screen */
const Pantry = ({navigation}) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);  // delete conformation modal state
  const [pantryData, setPantryData] = useState({});               // firebase pantry state
  const [name, setName] = useState('');                           // editing input fields states
  const [loading, setLoading] = useState(true);
  /* Screen Functions */
  const toggleDialog = () => {setIsDialogVisible(!isDialogVisible);}; // togles delete confirmation

  // This is to fetch the pantry data from the firebase
  const fetchData = async () => {
    setLoading(true); // Set loading to true when data fetching starts
    const data = await loadPantryData();
    setPantryData(data);
    setLoading(false);
  };

  // This loads the pantry data from The firebase
  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData();
    };
    fetchDataAsync();
  }, []);

  // This is the render method for the individual pantry items
  const renderItem = ({ item }) => (
    // This is the container for the item
    <View style={styles.itemContainer}>
      {/* This is the text container for the item name and quantity */}
      <View style={styles.textContainer}>
        <Text style={styles.text2}>{item.key}</Text>
        <Text style={styles.text2}>Quantity: {item.itemData.quantity}</Text>
      </View>
      {/* This is the text container for the date purchased */}
      <View style={styles.textContainer}>
        <Text style={styles.text3}>Purchased: </Text>
        <Text style={styles.text3}>{`${item.itemData.datePurchased.getMonth()+1}/${item.itemData.datePurchased.getDate()}/${item.itemData.datePurchased.getFullYear()}`}</Text>
      </View>
      {/* This is the text container for the expiration date */}
      <View style={styles.textContainer}>
        <Text style={styles.text3}>Expiration Date: {item.itemData.expiration.toDateString()}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit Item"
          color = 'darkorange'
          style={styles.editButton}
          onPress={() => {
            setName(item.key);
            navigation.navigate('Edit Item', { itemName: item.key });
          }}
        />
        <Text>          </Text>
        <Button
          title="Delete Item"
          color = 'darkred'
          onPress={() => {
            setName(item.key); // Set the name of the item
            // setSelectedItem(item); // Set the selected item
            toggleDialog();
          }}
        />
      </View>
    </View>
  );
  
  // This is the actual screen that is rendered
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {/* Conditionally render the pantry items */}
            {!pantryData || Object.keys(pantryData).length === 0 ? (
              <View style={styles.itemContainer}>
                <Text style={styles.text}>Your pantry is empty!</Text>
                <Text style={styles.text}>You should add some items!</Text>
                <Button
                  title="Add Item"
                  onPress={() => {
                    navigation.navigate("Add Item");
                  }}
                />
              </View>
            ) : (
              <View style={styles.pantryContainer}>
                <FlatList
                  data={pantryData}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.key}
                />
              </View>
            )}
  
            <Modal
              animationType="slide"
              transparent={true}
              visible={isDialogVisible}
            >
              {/* This is the delete item modal */}
              <View style={styles.modalContainer}>
                <Text style={styles.confirmationText}>
                  Are you sure you want to delete the item from your pantry?
                </Text>
                <View style={styles.buttonContainer}>
                  <Button title="No" color="red" onPress={toggleDialog} />
                  <Text>          </Text>
                  <Button
                    title="Yes"
                    color="green"
                    onPress={async () => {
                      if (name) {
                        await deleteItem(name);
                        fetchData(); // Refresh pantry data
                        toggleDialog(); // Close the modal
                        Snackbar.show({
                          text: "Item deleted!",
                          duration: Snackbar.LENGTH_SHORT,
                        });
                      }
                    }}
                  />
                </View>
              </View>
            </Modal>
          </>
        )}
  
        {/* Buttons at the bottom of the screen */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#f7c3f1', width: '100%'}}>
          <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => navigation.navigate("Home Screen")}>
            <Text style={styles.text4}>&#9750;</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => navigation.navigate("Add Item")}>
            <Text style={styles.text4}>&#65291;</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={() => {
                fetchData();
                Snackbar.show({
                  text: 'Pantry refreshed',
                  duration: Snackbar.LENGTH_SHORT,
                });
              }}>
            <Text style={styles.text4}>&#x21bb;</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );  
};

export default Pantry;