// types.ts

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  price: number;
  course: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
}

export type Course = MenuItem['course'];

// Global variable concept: Sample Menu Items
export const initialMenuItems: MenuItem[] = [
  { id: '1', dishName: 'Caesar Salad', description: 'Classic starter with romaine lettuce and croutons.', price: 129.99, course: 'Appetizer' },
  { id: '2', dishName: 'Steak Frites', description: 'Grilled sirloin steak with crispy fries.', price: 124.50, course: 'Main Course' },
  { id: '3', dishName: 'Chocolate Lava Cake', description: 'Warm cake with a molten chocolate center.', price: 128.00, course: 'Dessert' },
  { id: '4', dishName: 'Espresso', description: 'Strong, concentrated coffee shot.', price: 113.50, course: 'Beverage' },
  { id: '5', dishName: 'Vanilla Bean Cheesecake', course: 'Dessert', description: 'A smooth cheesecake topped with vanilla bean and a graham cracker crust.', price: 116.49 },
  { id: '6', dishName: 'Iced Latte', course: 'Beverage', description: 'Cold espresso mixed with ice and topped with milk.', price: 124.50 },
  { id: '7', dishName: 'Fresh Lemonade', course: 'Beverage', description: 'A refreshing, tangy lemonade made from fresh squeezed lemons.', price: 153.25 },
];

export const allCourses: Course[] = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];