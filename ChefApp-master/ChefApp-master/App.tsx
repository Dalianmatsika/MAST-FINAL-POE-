// App.tsx
import React, { useState, useMemo } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// --- Import Refactored Modules ---
import { initialMenuItems, MenuItem, Course } from './types'; 
// Import all screens
import HomeScreen from './HomeScreen';
import AddMenuScreen from './AddMenuScreen'; 
import FilterScreen from './FilterScreen';
import MenuItemScreen from './MenuItemScreen';
import EditMenuScreen from './EditMenuScreen'; // New Edit Screen Import

// --- Type Definitions for Navigation ---
type RootStackParamList = {
  Home: { 
    appliedCourseFilter: Course | '';
    appliedSearchQuery: string; 
  };
  AddMenu: undefined; // Renamed to AddMenu
  Filter: { currentCourseFilter: Course | ''; currentSearchQuery: string };
  MenuItemDetails: { item: MenuItem };
  EditMenu: { item: MenuItem; onEditDish: (updatedItem: MenuItem) => void; }; // Pass item and edit function
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  // Global menu state (Global Variable concept)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  
  // State for filtering applied from FilterScreen
  const [courseFilter, setCourseFilter] = useState<Course | ''>('');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to organise code: Adds a new dish
  const onAddDish = (newItem: MenuItem) => {
    setMenuItems((currentItems) => [...currentItems, newItem]);
  };

  // Function to organise code: Removes a dish
  const onRemoveDish = (id: string, name: string) => {
    setMenuItems((currentItems) => currentItems.filter(item => item.id !== id));
    // The alert is triggered in HomeScreen, but we log the success here
    console.log(`${name} removed successfully.`);
  };

  // Function to organise code: Edits/Updates a dish (New Function)
  const onEditDish = (updatedItem: MenuItem) => {
    setMenuItems((currentItems) => currentItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    // The success alert is now handled in EditMenuScreen
  };

  // Function to handle filter application from FilterScreen
  const handleApplyFilters = (filters: { course?: Course | ''; searchQuery?: string }) => {
    setCourseFilter(filters.course || '');
    setSearchQuery(filters.searchQuery || '');
  };

  // Filter the menu items based on the current filters
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => {
      const courseMatch = courseFilter === '' || item.course === courseFilter;
      const searchMatch = searchQuery.trim() === '' || item.dishName.toLowerCase().includes(searchQuery.trim().toLowerCase());
      return courseMatch && searchMatch;
    });
  }, [menuItems, courseFilter, searchQuery]);

  // Header styles for all screens
  const headerOptions = {
    headerStyle: { backgroundColor: '#dc3545' },
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' as const },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        
        {/* Home Screen (Menu Display with Edit/Remove Buttons) */}
        <Stack.Screen name="Home" options={{ title: 'The Complete Menu', ...headerOptions }}>
          {props => (
            <HomeScreen 
              {...props} 
              menuItems={filteredMenuItems}
              allMenuItems={menuItems}
              onRemoveDish={onRemoveDish} // Passed to HomeScreen
              onNavigateToEdit={(item) => props.navigation.navigate('EditMenu', { item, onEditDish })} // Passed to HomeScreen
              onNavigateToFilter={(currentFilters) => props.navigation.navigate('Filter', currentFilters)}
            />
          )}
        </Stack.Screen>

        {/* Add Menu Screen (Feature 2: ADD only) */}
        <Stack.Screen name="AddMenu" options={{ title: 'Add New Menu Item', ...headerOptions }}>
          {props => (
            <AddMenuScreen 
              onAddDish={onAddDish} 
              onNavigateBack={() => props.navigation.goBack()}
            />
          )}
        </Stack.Screen>

        {/* Edit Menu Screen (New Route) */}
        <Stack.Screen name="EditMenu" component={EditMenuScreen} options={{ title: 'Edit Dish', ...headerOptions }} />

        {/* Filter Screen (Feature 3) */}
        <Stack.Screen name="Filter" options={{ title: 'Filter Menu', ...headerOptions }}>
          {props => (
            <FilterScreen 
            menuItems={[]} {...props}
            onApplyFilters={(filters) => {
              handleApplyFilters(filters as { course: Course | ''; searchQuery: string; });
              props.navigation.navigate('Home', { appliedCourseFilter: filters.course as Course | '', appliedSearchQuery: filters.searchQuery || '' });
            } }
            onNavigateBack={() => props.navigation.goBack()}            />
          )}
        </Stack.Screen>
        
        <Stack.Screen name="MenuItemDetails" component={MenuItemScreen} options={{ title: 'Dish Details', ...headerOptions }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
// Note: You still need to ensure FilterScreen.tsx and MenuItemScreen.tsx 
// (or their placeholder logic) are present and correctly structured.
// The provided placeholder logic for these files from your initial upload 
// should be moved to their own files if they don't already exist.