# MAST-FINAL-POE-
# 1.Overview

This document provides a summary of the development work for the Menu Management Application, a React Native project built to demonstrate proficiency in modular application design, state management, and implementation of core business logic.

The key achievement of this development cycle was the complete refactoring of the codebase from a monolithic structure to a clean, multi-file modular architecture. Functionally, this update integrated full Create, Read, Update, and Delete (CRUD) capabilities directly onto the main Home Screen, allowing for seamless in-line management of menu items. Additionally, all mandatory analytical features, such as the average price breakdown (demonstrating looping) and dynamic filtering, were successfully integrated and optimized.
# 2. Architectural Refactoring and Modular Design
The core structural goal was achieved by breaking down the application into specialized, manageable files.

Code Organization: The codebase was segregated to improve clarity, using Functions and Multiple Files. Data structures and Global Variables were moved to types.ts, while reusable computations were moved to utils.ts.

Screen Separation: A new screen, EditMenuScreen.tsx, was created specifically for dish updates. The original 'Manage Menu' screen was simplified and renamed AddMenuScreen.tsx (for dish creation only).

Navigation and State: App.tsx now serves as the central state manager and router, delegating all UI rendering and localized logic to the respective screen components.

# 3. Full In-Line Menu Management (CRUD)
All management controls were moved to the HomeScreen for direct access and improved user experience.

Edit Functionality: An 'Edit' button on every menu item row triggers navigation to the dedicated EditMenuScreen. The central onEditDish function in App.tsx handles the state update using the array's .map() method.

Remove Functionality: A 'Remove' button is present on every item, which requires a confirmation Alert before calling the state-updating onRemoveDish function. This deletion function uses the array's .filter() method to manage the global state.

# 4. Core Feature Implementations
Average Price Calculation
utils.ts contains the calculateAveragePrices function.

The logic uses a standard for loop to iterate over the entire menu array and aggregate price totals per course.

A subsequent for...in loop is used to calculate and return the final average price for display on the HomeScreen.

Filtering and UX
Filter Status Display: The HomeScreen now displays a clear section detailing all currently Applied Filters (Course and Search Query), improving transparency.

Optimization: Filtering logic in App.tsx is optimized using the useMemo hook to efficiently update the displayed items based on the active filters.

# SCREENSHOTS OF WEB RUNNING AND RESPONSIVENESS 
<img width="1365" height="723" alt="Screenshot 2025-11-12 224536" src="https://github.com/user-attachments/assets/b0ff7396-1b57-4987-bcb4-8177849b9429" />
<img width="301" height="533" alt="Screenshot 2025-11-12 224615" src="https://github.com/user-attachments/assets/7ac10042-68df-491c-ac87-c013338e4ca1" />
<img width="495" height="670" alt="Screenshot 2025-11-12 224719" src="https://github.com/user-attachments/assets/b5af5f36-1707-45f0-adf2-9b89d11ba116" />
<img width="1365" height="724" alt="Screenshot 2025-11-12 224742" src="https://github.com/user-attachments/assets/61738361-05f5-4bbc-9649-82699dd07870" />




