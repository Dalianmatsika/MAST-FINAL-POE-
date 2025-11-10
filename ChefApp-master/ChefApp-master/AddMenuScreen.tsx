// AddMenuScreen.tsx (Dedicated to Adding New Dishes)
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

// --- Import Refactored Modules ---
import { MenuItem, Course, allCourses } from './types';

// --- Type Definitions for Props ---
interface AddMenuScreenProps {
  onAddDish: (newItem: MenuItem) => void;
  onNavigateBack: () => void;
}

const AddMenuScreen: React.FC<AddMenuScreenProps> = ({ 
  onAddDish, 
  onNavigateBack 
}) => {
  const [dishName, setDishName] = useState('');
  const [course, setCourse] = useState<Course>(allCourses[0] || 'Main Course'); 
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Use a function to organise code: Handles adding a new dish
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

    const newItem: MenuItem = {
      id: Date.now().toString(),
      dishName,
      course: course,
      description,
      price: priceValue,
    };

    onAddDish(newItem);
    // Clear the form after saving
    setDishName('');
    setCourse(allCourses[0] || 'Main Course');
    setDescription('');
    setPrice('');
    Alert.alert('Success', `${dishName} added to the menu!`);
  };

  // Generate Picker items using map over allCourses
  const coursePickerItems = allCourses.map((c) => (
    <Picker.Item key={c} label={c} value={c} />
  ));
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add New Dish</Text>
      
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
        <Text style={styles.buttonText}>Add Dish to Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
        <Text style={styles.cancelText}>Back to Menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddMenuScreen; 

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
  button: { backgroundColor: '#dc3545', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  backButton: { marginTop: 10, paddingVertical: 10, alignItems: 'center' },
  cancelText: { color: '#007bff', fontSize: 16, fontWeight: '500' },
});