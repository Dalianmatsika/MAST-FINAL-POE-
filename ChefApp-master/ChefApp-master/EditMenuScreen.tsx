// EditMenuScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';

// --- Import Refactored Modules ---
import { MenuItem, Course, allCourses } from './types'; 

// Define the required props structure for type safety
type EditMenuProps = StackScreenProps<{
  EditMenu: { 
    item: MenuItem; 
    onEditDish: (updatedItem: MenuItem) => void; 
  };
}, 'EditMenu'>;


const EditMenuScreen: React.FC<EditMenuProps> = ({ route, navigation }) => {
  const { item, onEditDish } = route.params;

  // State initialized with the current item's values
  const [dishName, setDishName] = useState(item.dishName);
  const [course, setCourse] = useState<Course>(item.course); 
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price.toFixed(2));

  // Function to organise code: Handles updating a dish
  const handleSave = () => {
    if (!dishName || !description || !price) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
        Alert.alert('Validation Error', 'Please enter a valid price.');
        return;
    }

    const updatedItem: MenuItem = {
      ...item, // Keep the original ID
      dishName,
      course: course,
      description,
      price: priceValue,
    };

    onEditDish(updatedItem);
    Alert.alert('Success', `${dishName} updated successfully!`);
    navigation.goBack(); // Navigate back to the Home Screen
  };

  const coursePickerItems = allCourses.map((c) => (
    <Picker.Item key={c} label={c} value={c} />
  ));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Edit Dish: {item.dishName}</Text>
      
      <TextInput placeholder="Dish Name" style={styles.input} value={dishName} onChangeText={setDishName} />
      
      <Text style={styles.label}>Course</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={course}
          onValueChange={(itemValue) => setCourse(itemValue as Course)}
          style={Platform.OS === 'ios' ? styles.pickerIOS : styles.picker}
          itemStyle={Platform.OS === 'ios' ? { height: 50 } : {}}
        >
          {coursePickerItems}
        </Picker>
      </View>

      <TextInput placeholder="Description" style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} multiline />
      
      <TextInput placeholder="Price (e.g., 125.99)" style={styles.input} value={price} onChangeText={setPrice} keyboardType="decimal-pad" />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Update Dish</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditMenuScreen;

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, marginBottom: 15 },
  textArea: { height: 80, textAlignVertical: 'top' },
  label: { fontSize: 16, marginBottom: 5, color: '#555' },
  pickerWrapper: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 15, overflow: 'hidden' },
  picker: { height: 50, width: '100%' },
  pickerIOS: { height: 150 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  backButton: { marginTop: 10, paddingVertical: 10, alignItems: 'center' },
  cancelText: { color: '#dc3545', fontSize: 16, fontWeight: '500' },
});