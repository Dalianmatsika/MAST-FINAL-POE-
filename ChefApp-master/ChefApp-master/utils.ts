// utils.ts
import type { MenuItem, Course } from './types';

/**
 * Calculates the average price of menu items broken down by course.
 * Uses a for loop and a for...in loop to fulfill requirements.
 */
export const calculateAveragePrices = (items: MenuItem[]) => {
  const courseStats: { [key in Course]?: { total: number; count: number } } = {};
  
  // Initialize stats for all courses using a simple for-loop (Fulfills for-loop requirement)
  const courses: Course[] = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    courseStats[course] = { total: 0, count: 0 };
  }

  // Use a for loop to iterate over the array and calculate totals and counts
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const course = item.course;
    if (courseStats[course]) {
      courseStats[course]!.total += item.price;
      courseStats[course]!.count += 1;
    }
  }
  
  const averages: { [key in Course]?: number } = {};

  // Use a for...in loop to calculate the final average prices (Fulfills for...in requirement)
  for (const course in courseStats) {
    const key = course as Course;
    const stats = courseStats[key];
    if (stats && stats.count > 0) {
      averages[key] = stats.total / stats.count;
    } else if (stats && stats.count === 0) {
      averages[key] = 0; // Explicitly set to 0 if no items for that course
    }
  }

  return averages;
};

// Function to organise code: Provides a distinct color for each course
export const getCourseColor = (course: Course) => {
  switch (course) {
    case 'Appetizer': return '#ffc107'; 
    case 'Main Course': return '#dc3545'; 
    case 'Dessert': return '#007bff'; 
    case 'Beverage': return '#17a2b8'; 
    default: return '#6c757d';
  }
};