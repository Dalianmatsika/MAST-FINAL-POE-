// HomeScreen.tsx
import React, { useMemo } from 'react';  
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

// --- Import Refactored Modules ---
import { MenuItem, Course, allCourses } from './types';
import { getCourseColor, calculateAveragePrices } from './utils'; 

// --- Type Definitions for Props (Matches App.tsx logic) ---
interface HomeScreenProps {
  menuItems: MenuItem[]; // Filtered items for display
  allMenuItems: MenuItem[]; // All items for calculation
  navigation: StackScreenProps<any, 'Home'>['navigation'];
  route: StackScreenProps<any, 'Home'>['route'];
  onNavigateToFilter: (currentFilters: { currentCourseFilter: Course | ''; currentSearchQuery: string }) => void;
  onRemoveDish: (id: string, name: string) => void; // Passed from App.tsx
  onNavigateToEdit: (item: MenuItem) => void; // Passed from App.tsx
}

const HomeScreen: React.FC<HomeScreenProps> = ({ menuItems, allMenuItems, navigation, route, onNavigateToFilter, onRemoveDish, onNavigateToEdit }) => {
  
  // Get applied filters from navigation route params
  const appliedCourseFilter = route.params?.appliedCourseFilter || '';
  const appliedSearchQuery = route.params?.appliedSearchQuery || '';

  // Calculate the average prices (Feature 1)
  const averagePrices = useMemo(() => {
    return calculateAveragePrices(allMenuItems); 
  }, [allMenuItems]); 

  // Function to organise code: Handles removing an existing dish (confirmation dialog)
  const handleRemove = (id: string, name: string) => {
    Alert.alert(
        'Confirm Removal',
        `Are you sure you want to remove "${name}" from the menu?`,
        [
            { text: 'Cancel', style: 'cancel' },
            { 
                text: 'Remove', 
                style: 'destructive', 
                onPress: () => onRemoveDish(id, name) // Calls the function passed from App.tsx
            },
        ]
    );
  }

  // Function to render the individual list items
  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={homeStyles.itemRow}>
      {/* Tap here for details */}
      <TouchableOpacity
          style={homeStyles.itemContainer}
          onPress={() => navigation.navigate('MenuItemDetails', { item })}
      >
        <View style={{ flex: 1 }}>
          <Text style={homeStyles.dishName}>{item.dishName}</Text>
          <Text style={[homeStyles.course, { color: getCourseColor(item.course) }]}>{item.course}</Text>
          <Text style={homeStyles.description}>{item.description}</Text>
        </View>
        <Text style={homeStyles.price}>R{item.price.toFixed(2)}</Text> 
      </TouchableOpacity>
      
      {/* --- Edit and Remove Buttons (New Location) --- */}
      <View style={homeStyles.actionButtons}>
        <TouchableOpacity 
          style={homeStyles.editButton}
          onPress={() => onNavigateToEdit(item)} // Navigate to the Edit screen
        >
          <Text style={homeStyles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={homeStyles.removeButton}
          onPress={() => handleRemove(item.id, item.dishName)} // Trigger removal confirmation
        >
          <Text style={homeStyles.actionButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
      {/* --- End Edit and Remove Buttons --- */}
    </View>
  );
  
  // Function to render the header/summary section
  const renderHeader = () => (
    <View>
      {/* --- Average Price Breakdown Display (Feature 1) --- */}
      <View style={homeStyles.averagePriceContainer}>
        <Text style={homeStyles.heading}>Average Price by Course</Text>
        <View style={homeStyles.averageList}>
          {allCourses.map((course) => (
            <View key={course} style={homeStyles.averageItem}>
              <Text style={[homeStyles.averageCourse, { color: getCourseColor(course) }]}>{course}:</Text>
              <Text style={homeStyles.averagePrice}>
                R{averagePrices[course]?.toFixed(2) || '0.00'}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {/* --- Applied Filter Display --- */}
      {(appliedCourseFilter !== '' || appliedSearchQuery !== '') && (
        <View style={homeStyles.filterStatusContainer}>
          <Text style={homeStyles.filterStatusTitle}>Applied Filters:</Text>
          {appliedCourseFilter !== '' && (
            <Text style={homeStyles.filterStatusText}>Course: <Text style={{fontWeight: 'bold'}}>{appliedCourseFilter}</Text></Text>
          )}
          {appliedSearchQuery !== '' && (
            <Text style={homeStyles.filterStatusText}>Search: <Text style={{fontWeight: 'bold'}}>{appliedSearchQuery}</Text></Text>
          )}
          <TouchableOpacity 
            style={homeStyles.clearFilterButton}
            onPress={() => navigation.setParams({ appliedCourseFilter: '', appliedSearchQuery: '' })}
          >
             <Text style={homeStyles.clearFilterButtonText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={homeStyles.menuListTitle}>
        {appliedCourseFilter || appliedSearchQuery ? `Filtered Menu (${menuItems.length} Dishes)` : `All Dishes (${allMenuItems.length} Dishes)`}
      </Text>
    </View>
  );

  return (
    <View style={homeStyles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={homeStyles.emptyListContainer}>
            <Text style={homeStyles.emptyText}>No menu items found matching the filter.</Text>
          </View>
        }
      />
      
      {/* Floating Buttons: Add and Filter */}
      <TouchableOpacity 
        style={homeStyles.addButton} 
        onPress={() => navigation.navigate('AddMenu')} // Navigates to the Add Dish Screen
      >
        <Text style={homeStyles.addButtonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={homeStyles.filterButton} 
        onPress={() => onNavigateToFilter({ 
          currentCourseFilter: appliedCourseFilter as Course | '', 
          currentSearchQuery: appliedSearchQuery 
        })}
      >
        <Text style={homeStyles.filterButtonText}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

// --- Styles (Ensure these are in your HomeScreen.tsx file) ---
const homeStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  averagePriceContainer: { padding: 15, marginHorizontal: 10, marginBottom: 10, backgroundColor: '#e6f7ff', borderRadius: 8, elevation: 2 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#0056b3', textAlign: 'center' },
  averageList: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  averageItem: { width: '48%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  averageCourse: { fontSize: 14, fontWeight: '600' },
  averagePrice: { fontSize: 14, fontWeight: 'bold', color: '#28a745' },
  filterStatusContainer: { padding: 15, marginHorizontal: 10, marginBottom: 10, backgroundColor: '#fffbe6', borderRadius: 8, },
  filterStatusTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#856404' },
  filterStatusText: { fontSize: 14, color: '#856404' },
  clearFilterButton: { marginTop: 10, padding: 8, backgroundColor: '#f0ad4e', borderRadius: 5, alignItems: 'center' },
  clearFilterButtonText: { color: '#333', fontWeight: 'bold' },
  menuListTitle: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 10, paddingVertical: 5, color: '#333', backgroundColor: '#eee' },
  
  itemRow: { 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd', 
    backgroundColor: '#fff',
  },
  itemContainer: { 
    padding: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    flex: 1, 
  },
  dishName: { fontSize: 18, fontWeight: '600', color: '#333' },
  course: { fontSize: 14, fontWeight: 'bold', marginTop: 2, marginBottom: 4 },
  description: { fontSize: 12, color: '#999' },
  price: { fontSize: 18, fontWeight: 'bold', color: '#28a745', marginLeft: 10 },
  
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  emptyListContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 30, height: 200 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#999' },
  
  addButton: { position: 'absolute', width: 60, height: 60, alignItems: 'center', justifyContent: 'center', right: 20, bottom: 80, backgroundColor: '#dc3545', borderRadius: 30, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 3 },
  addButtonText: { color: 'white', fontSize: 35, lineHeight: 35, marginBottom: 2 },
  filterButton: { position: 'absolute', width: 60, height: 60, alignItems: 'center', justifyContent: 'center', right: 20, bottom: 10, backgroundColor: '#007bff', borderRadius: 30, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.4, shadowRadius: 3 },
  filterButtonText: { color: 'white', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
});