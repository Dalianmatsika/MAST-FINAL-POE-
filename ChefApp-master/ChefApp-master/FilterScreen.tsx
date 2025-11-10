// FilterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

// --- Import Refactored Modules ---
import { MenuItem, Course, allCourses } from './types'; 

interface FilterScreenProps {
  menuItems: MenuItem[]; 
  onNavigateBack: () => void; 
  onApplyFilters: (filters: { course?: Course | ''; searchQuery?: string }) => void; 
  navigation: any; 
  route: any; 
}

const FilterScreen: React.FC<FilterScreenProps> = ({ route, onNavigateBack, onApplyFilters }) => {
  // Get initial filter values from route params
  const initialCourse = route.params?.currentCourseFilter || '';
  const initialSearch = route.params?.currentSearchQuery || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCourse, setSelectedCourse] = useState<Course | ''>(initialCourse); 

  /**
   * Sends the current search query and selected course back to the parent component.
   */
  const handleApplyFilters = () => {
    onApplyFilters({
      searchQuery: searchQuery.trim(), 
      course: selectedCourse,
    });
  };

  // Function to organise code: Clears filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCourse('');
    onApplyFilters({ searchQuery: '', course: '' });
  };

  const CourseButton: React.FC<{ title: string; courseValue: Course | '' }> = ({ title, courseValue }) => (
    <TouchableOpacity
      style={[
        styles.courseButton,
        selectedCourse === courseValue ? styles.courseButtonSelected : styles.courseButtonUnselected
      ]}
      onPress={() => setSelectedCourse(courseValue)}
    >
      <Text style={[
        styles.courseButtonText, 
        selectedCourse === courseValue ? styles.courseButtonTextSelected : styles.courseButtonTextUnselected
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Filter Menu</Text>

      {/* --- Search Filter --- */}
      <Text style={styles.label}>Search by Dish Name:</Text>
      <TextInput
        placeholder="Enter dish name..."
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* --- Course Filter (Feature 3) --- */}
      <Text style={styles.label}>Filter by Course:</Text>
      <View style={styles.courseButtons}>
        {/* All button */}
        <CourseButton title="All Courses" courseValue={''} />
        
        {/* Course buttons using allCourses from types.ts */}
        {allCourses.map((course) => (
            <CourseButton key={course} title={course} courseValue={course} />
        ))}
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
          <Text style={styles.clearButtonText}>Clear Filters</Text>
        </TouchableOpacity>
      </View>

      <Button title="Back to Menu" onPress={onNavigateBack} />
    </View>
  );
};

export default FilterScreen;

// --- Styles (for brevity, only button styles are detailed) ---
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    heading: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 25, textAlign: 'center' },
    searchInput: { height: 45, borderColor: '#ddd', borderWidth: 1, marginBottom: 20, borderRadius: 8, paddingHorizontal: 15, backgroundColor: '#f9f9f9', fontSize: 16 },
    label: { fontSize: 16, fontWeight: '600', color: '#333', marginTop: 10, marginBottom: 10 },
    courseButtons: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 30, flexWrap: 'wrap' },
    courseButton: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 20, marginVertical: 5, marginRight: 10, minWidth: 70, alignItems: 'center' },
    courseButtonSelected: { backgroundColor: '#387EF5', borderWidth: 1, borderColor: '#387EF5' },
    courseButtonUnselected: { backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#ddd' },
    courseButtonText: { fontSize: 14, fontWeight: '600' },
    courseButtonTextSelected: { color: '#fff' },
    courseButtonTextUnselected: { color: '#333' },
    buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    applyButton: { flex: 1, backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginRight: 10 },
    applyButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    clearButton: { backgroundColor: '#ffc107', padding: 15, borderRadius: 8, alignItems: 'center' },
    clearButtonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
});