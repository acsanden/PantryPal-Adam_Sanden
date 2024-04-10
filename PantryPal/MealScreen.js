import React, { useState } from 'react';
import { View, Text, Styles, TextInput, Button, FlatList, ImageBackground, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import image from './Images/italy.jpg';
import SearchComponent from './searchComponent';


const preCodedMeals = [
    { name: 'Spaghetti Bolognese', calories: 500, ingredients: ['Spaghetti', 'Bolognese sauce', 'Ground beef'], categories: ['high protein'] },
    { name: 'Caesar Salad', calories: 300, ingredients: ['Romaine lettuce', 'Caesar dressing', 'Croutons'], categories: ['low carb'] },
    { name: 'Grilled Chicken', calories: 400, ingredients: ['Chicken breast', 'Olive oil', 'Seasonings'], categories: ['high protein', 'low carb'] },
    { name: 'Margherita Pizza', calories: 600, ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella cheese'], categories: ['vegetarian'] },
    { name: 'Chicken Alfredo', calories: 700, ingredients: ['Fettuccine pasta', 'Chicken', 'Alfredo sauce'], categories: ['high protein'] },
    { name: 'Vegetable Stir-Fry', calories: 350, ingredients: ['Mixed vegetables', 'Soy sauce', 'Cooking oil'], categories: ['vegan', 'gluten free', 'low carb'] },
    { name: 'Hamburger', calories: 550, ingredients: ['Ground beef patty', 'Burger bun', 'Lettuce, tomato, and condiments'], categories: ['high protein'] },
    { name: 'Salmon Fillet', calories: 450, ingredients: ['Salmon fillet', 'Lemon', 'Herbs'], categories: ['high protein', 'low carb'] },
    { name: 'Shrimp Scampi', calories: 380, ingredients: ['Shrimp', 'Garlic', 'Butter'], categories: ['low carb'] },
    { name: 'Vegetarian Burrito', calories: 420, ingredients: ['Flour tortilla', 'Black beans', 'Guacamole'], categories: ['vegetarian', 'high fiber'] },
    { name: 'Sushi Roll (California)', calories: 320, ingredients: ['Rice', 'Avocado', 'Crab or imitation crab'], categories: ['high protein'] },
    { name: 'Pasta Primavera', calories: 380, ingredients: ['Pasta', 'Assorted vegetables', 'Creamy sauce'], categories: ['vegetarian'] },
    { name: 'Chicken Teriyaki', calories: 480, ingredients: ['Chicken thighs', 'Teriyaki sauce', 'Sesame seeds'], categories: ['high protein'] },
    { name: 'Greek Salad', calories: 250, ingredients: ['Cucumbers', 'Tomatoes', 'Feta cheese'], categories: ['vegetarian', 'low carb'] },
    { name: 'Beef Tacos', calories: 400, ingredients: ['Ground beef', 'Taco shells', 'Lettuce, cheese, and salsa'], categories: ['high protein'] },
    { name: 'Caesar Wrap', calories: 320, ingredients: ['Grilled chicken', 'Romaine lettuce', 'Caesar dressing'], categories: ['high protein', 'low carb'] },
    { name: 'BBQ Ribs', calories: 800, ingredients: ['Pork ribs', 'BBQ sauce', 'Seasonings'], categories: ['high protein'] },
    { name: 'Eggplant Parmesan', calories: 450, ingredients: ['Eggplant', 'Tomato sauce', 'Parmesan cheese'], categories: ['vegetarian'] },
    { name: 'Tofu Stir-Fry', calories: 300, ingredients: ['Tofu', 'Vegetables', 'Soy sauce'], categories: ['vegan', 'high protein', 'gluten free'] },
    { name: 'Cheeseburger', calories: 600, ingredients: ['Beef patty', 'Cheese', 'Burger bun'], categories: ['high protein'] },
    // Add more meals as needed
];

const MealScreen = ({ navigation }) => {
    const [meal, setMeal] = useState('');
    const [mealsList, setMealsList] = useState([]);
    const [showAllMealsModal, setShowAllMealsModal] = useState(false);
    const [selectedMealToAdd, setSelectedMealToAdd] = useState(null);

    const handleAddMeal = () => {
        if (meal.trim() !== '') {
            setMealsList([...mealsList, meal]);
            setMeal('');
        }
    };

    const handleRemoveItem = (index) => {
        const updatedMealsList = [...mealsList];
        updatedMealsList.splice(index, 1);
        setMealsList(updatedMealsList);
    };

    const getMealDetails = (mealNameStr) => {
        const matchedMeal = preCodedMeals.find((m) => m.name.toLowerCase() === mealNameStr.toLowerCase());
        if (matchedMeal) {
            return `${matchedMeal.name} - ${matchedMeal.calories} calories\nIngredients: ${matchedMeal.ingredients.join(', ')}`;
        } else {
            return `${mealNameStr} - Meal details not available`;
        }
    };

    const getCaloriesForMeal = (mealNameStr) => {
        const matchedMeal = preCodedMeals.find((m) => m.name.toLowerCase() === mealNameStr.toLowerCase());
        return matchedMeal ? `${matchedMeal.calories}` : 'Calories not available';
    };

    const handleDisplayAllMeals = () => {
        setShowAllMealsModal(true);
    };

    const handleCloseAllMealsModal = () => {
        setShowAllMealsModal(false);
        setSelectedMealToAdd(null);
    };

    const handleAddSelectedMeal = (mealName) => {
        const mealToAdd = preCodedMeals.find(meal => meal.name === mealName);
        if (mealToAdd) {
            setMealsList([...mealsList, mealToAdd.name]); // Add only the name string
        }
    };

    //Manage the selected category
    const [selectedCategory, setSelectedCategory] = useState(null);

    //Filter meals by category
    const filterMealsByCategory = (category) => {
        // Return all meals if no category is selected
        if (!category) return preCodedMeals;
      
        // Convert input category to lowercase for case-insensitive comparison
        const lowerCaseCategory = category.toLowerCase();
      
        // Filter meals by category, ignoring case
        return preCodedMeals.filter(meal => 
          meal.categories.some(cat => cat.toLowerCase() === lowerCaseCategory)
        );
    };
      

    const CategoryButton = ({ category, setSelectedCategory }) => (
        <TouchableOpacity onPress={() => setSelectedCategory(category)}>
            <View style={styles.categoryButton}>
                <Text style={{ color: 'white' }}>{category.toUpperCase()}</Text>
            </View>
        </TouchableOpacity>
    );

    const mealCategories = ['vegan', 'high protein', 'gluten free'];

    return (
        <ImageBackground
            source={image}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            
            <SearchComponent setSelectedCategory={setSelectedCategory} />

            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 }}>


            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                {mealCategories.map((category, index) => (
                    <CategoryButton
                        key={index}
                        category={category}
                        setSelectedCategory={setSelectedCategory}
                    />
                ))}
            </View>

                <TextInput
                    placeholder="Enter a Meal"
                    value={meal}
                    onChangeText={(text) => setMeal(text)}
                    style={{ borderWidth: 1, borderColor: 'gray', width: 200, padding: 8, marginBottom: 5, backgroundColor: 'white' }}
                />
                <TouchableOpacity onPress={handleAddMeal}>
                    <View style={{ backgroundColor: 'teal', padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>Add Meal</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDisplayAllMeals}>
                    <View style={{ backgroundColor: 'brown', padding: 10, borderRadius: 5, marginTop: 10 }}>
                        <Text style={{ color: 'white' }}>Display All Meals</Text>
                    </View>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showAllMealsModal}
                >
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>All Pre-coded Meals</Text>
                        <FlatList
                            data={preCodedMeals}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.modalItem}>
                                    <Text>{item.name}</Text>
                                    <TouchableOpacity onPress={() => handleAddSelectedMeal(item.name)}>
                                        <View style={styles.addButton}>
                                            <Text style={{ color: 'white' }}>Select</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        <Button title="Close" onPress={handleCloseAllMealsModal} />
                    </View>
                </Modal>
                <FlatList
                    data={filterMealsByCategory(selectedCategory)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        const mealDetails = getMealDetails(item.name); // item should be the name of the meal, not the meal object
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: 10, marginVertical: 5, marginHorizontal: 10, borderRadius: 5 }}>
                                <Text>{mealDetails}</Text>
                                <View style={{ marginLeft: 7 }}>
                                    <Button title="X" onPress={() => handleRemoveItem(index)} color="maroon" />
                                </View>
                            </View>
                        );
                    }}
                />


            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    addButton: {
        backgroundColor: 'teal',
        padding: 5,
        borderRadius: 3,
    },
    categoryButton: {
        // add your styling for the button here
        backgroundColor: 'navy',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
});

export default MealScreen;