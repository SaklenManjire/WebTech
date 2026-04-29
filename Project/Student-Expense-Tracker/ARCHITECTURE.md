# Architecture Overview - Student Expense Tracker

## Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Application                         │
│                      (index.html → App.jsx)                      │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
           ┌────────▼────────┐   ┌────────▼────────┐
           │   useExpenses   │   │    Components   │
           │   (Custom Hook) │   │                 │
           └────────┬────────┘   └────────┬────────┘
                    │                     │
       ┌────────────┼─────────────────────┼────────────┐
       │            │                     │            │
   ┌───▼────┐  ┌───▼────┐  ┌─────────────▼──┐  ┌─────▼────┐
   │useState │  │useEffect│  │  ExpenseForm   │  │ Other    │
   │         │  │         │  │  ExpenseList   │  │Components│
   └───┬────┘  └───┬────┘  │  ExpenseItem   │  └──────────┘
       │           │       │  CategoryFilter│
       │       Storage     │  Statistics    │
       │                   │                │
   ┌───▼───────────────────▼────────────────▼────────────────┐
   │              localStorage (Data Persistence)            │
   └─────────────────────────────────────────────────────────┘
```

---

## Component Tree Structure

```
App (Main Entry Point)
│
├── ExpenseForm
│   ├── Category Select
│   ├── Amount Input
│   ├── Description Input
│   ├── Date Input
│   └── Submit Button
│
├── Statistics
│   ├── Progress Bars (per category)
│   └── Total Summary
│
├── CategoryFilter
│   ├── "All" Button
│   ├── "Food" Button
│   ├── "Transport" Button
│   ├── "Studies" Button
│   ├── "Entertainment" Button
│   └── "Other" Button
│
└── ExpenseList
    ├── (Empty State if no expenses)
    │
    └── [Multiple ExpenseItems]
        ├── Category Badge
        ├── Description
        ├── Date
        ├── Amount
        └── Delete Button
```

---

## State Management Flow

```
┌─────────────────────────────────────────┐
│      useExpenses Custom Hook            │
├─────────────────────────────────────────┤
│                                         │
│  State:                                 │
│  • expenses: []                         │
│  • selectedCategory: string             │
│                                         │
│  Computed:                              │
│  • filteredExpenses                     │
│  • totalSpent                           │
│  • categoryTotals                       │
│                                         │
│  Methods:                               │
│  • addExpense()                         │
│  • deleteExpense()                      │
│  • setSelectedCategory()                │
│                                         │
│  Effects:                               │
│  • Load from localStorage (mount)       │
│  • Save to localStorage (change)        │
│                                         │
└──────────┬──────────────────────────────┘
           │
    ┌──────┴──────────────────────┐
    │                             │
┌───▼──────────────┐   ┌──────────▼────────┐
│ Passed to Form   │   │ Passed to List    │
├──────────────────┤   ├───────────────────┤
│ • addExpense()   │   │ • filteredExp...  │
│ • onSubmit       │   │ • deleteExpense() │
└────────────────┬─┘   └──────────┬────────┘
                │                 │
          ┌─────▼─────────────────▼─────┐
          │   UI State Updates          │
          │   Component Re-render       │
          └─────────────────────────────┘
```

---

## Data Flow Diagram

### Adding an Expense

```
User Input (ExpenseForm)
        │
        ▼
Form Validation
        │
    ┌─────────────┐
    │ Valid?      │
    └─────────────┘
        │      │
       YES     NO
        │      │
        ▼      ▼
    addExpense  Alert User
        │
        ▼
Create Expense Object
  {
    id: unique,
    category,
    amount,
    description,
    date
  }
        │
        ▼
Update State (useState)
  expenses = [newExpense, ...expenses]
        │
        ▼
useEffect Triggered
  localStorage.setItem(data)
        │
        ▼
Component Re-render
        │
    ┌───┴───────────────────┐
    │                       │
    ▼                       ▼
ExpenseList             Statistics
Updates                 Recalculate
        │                   │
        └───────┬───────────┘
                ▼
          Display to User
```

### Filtering by Category

```
User Clicks Category Button
        │
        ▼
onCategoryChange()
        │
        ▼
setSelectedCategory(category)
        │
        ▼
State Update
        │
        ▼
Component Re-render
        │
        ▼
useExpenses Hook Recalculates
  filteredExpenses = 
    selectedCategory === 'All'
      ? expenses
      : expenses.filter(...)
        │
        ▼
Calculate New Totals
  totalSpent for filtered list
        │
        ▼
ExpenseList Updates
  Displays only filtered expenses
        │
        ▼
Statistics Updates
  Shows breakdown for filtered list
```

---

## File Dependency Tree

```
App.jsx (Entry Point)
│
├── components/
│   ├── ExpenseForm.jsx
│   │   └── (React, useState)
│   ├── ExpenseList.jsx
│   │   ├── ExpenseItem.jsx
│   │   │   └── (React)
│   │   └── (React)
│   ├── CategoryFilter.jsx
│   │   └── (React)
│   ├── Statistics.jsx
│   │   └── (React)
│   └── index.js
│       └── (Re-exports all components)
│
├── hooks/
│   ├── useExpenses.js
│   │   └── (React hooks)
│   └── index.js
│       └── (Re-exports useExpenses)
│
└── (localStorage)
```

---

## Component Responsibilities

### **App.jsx**
- ✓ Entry point for the application
- ✓ Uses custom hook to get all state/methods
- ✓ Orchestrates component layout
- ✓ Passes props to child components
- ✓ Manages overall page structure

### **ExpenseForm.jsx**
- ✓ Handles user input for new expenses
- ✓ Validates form fields
- ✓ Calls addExpense callback on submit
- ✓ Manages local form state
- ✓ Resets form after submission

### **ExpenseList.jsx**
- ✓ Displays list of expenses
- ✓ Maps through expenses array
- ✓ Renders ExpenseItem components
- ✓ Shows empty state when no expenses
- ✓ Displays total amount

### **ExpenseItem.jsx**
- ✓ Displays single expense card
- ✓ Shows category badge
- ✓ Formats and displays date
- ✓ Shows description and amount
- ✓ Provides delete button

### **CategoryFilter.jsx**
- ✓ Renders filter buttons
- ✓ Highlights selected category
- ✓ Calls setSelectedCategory on click
- ✓ Provides All category option

### **Statistics.jsx**
- ✓ Displays spending breakdown
- ✓ Shows per-category totals
- ✓ Renders progress bars
- ✓ Calculates percentages
- ✓ Shows total spending summary

### **useExpenses Hook**
- ✓ Manages all state (expenses, selectedCategory)
- ✓ Implements addExpense logic
- ✓ Implements deleteExpense logic
- ✓ Filters expenses by category
- ✓ Calculates statistics
- ✓ Syncs with localStorage

---

## Data Objects

```javascript
// Expense Record
{
  id: string,              // Unique identifier
  category: string,        // Food, Transport, Studies, Entertainment, Other
  amount: number,          // Amount in rupees
  description: string,     // What was spent on
  date: string            // YYYY-MM-DD format
}

// Category Total
{
  category: string,
  total: number
}
```

---

## State Mutations & Updates

### Adding Expense
```javascript
const newExpense = {
  ...expenseData,
  id: Date.now().toString()
};
setExpenses([newExpense, ...expenses]);
```

### Deleting Expense
```javascript
setExpenses(
  expenses.filter(expense => expense.id !== id)
);
```

### Filtering
```javascript
const filteredExpenses = 
  selectedCategory === 'All'
    ? expenses
    : expenses.filter(e => e.category === selectedCategory);
```

### Calculating Totals
```javascript
const totalSpent = filteredExpenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);
```

---

## Storage Structure

### localStorage Key
```
"student_expenses"
```

### localStorage Value
```json
[
  {
    "id": "1699872000000",
    "category": "Food",
    "amount": 250.50,
    "description": "Lunch at cafeteria",
    "date": "2024-01-15"
  },
  {
    "id": "1699872300000",
    "category": "Transport",
    "amount": 50,
    "description": "Auto ride",
    "date": "2024-01-15"
  }
]
```

---

## Component Rendering Flow

### Initial Load
```
App Mounts
   │
   ├─→ useExpenses Hook Initializes
   │    │
   │    ├─→ useState(expenses, selectedCategory)
   │    │
   │    └─→ useEffect (on mount)
   │         Load from localStorage
   │
   └─→ App Renders
        │
        ├─→ ExpenseForm
        ├─→ Statistics
        ├─→ CategoryFilter
        └─→ ExpenseList
```

### State Change
```
User Action (Add/Delete/Filter)
   │
   ▼
Update State
   │
   ▼
useEffect Detects Change
   │
   ├─→ Save to localStorage (if needed)
   │
   └─→ Trigger Re-render
        │
        └─→ Components Receive New Props
             │
             └─→ Display Updated Data
```

---

## Performance Considerations

### Optimization Strategies Used

1. **Component Composition**
   - Small, focused components
   - Each component handles its concern
   - Easy to optimize individually

2. **State Management**
   - Single source of truth (useExpenses hook)
   - Derived state calculated on demand
   - No unnecessary state duplication

3. **Array Operations**
   - Using reduce() for calculations
   - Using filter() for filtering (not mutating)
   - Efficient immutable updates

4. **localStorage**
   - Only saves when data changes
   - Loaded once on mount
   - No continuous syncing

---

## Scalability & Extension Points

### Easy to Extend
1. **Add new categories** - Update filter list
2. **Add budget limits** - Add to useState
3. **Add monthly view** - Add date filtering logic
4. **Add export feature** - Add to App component
5. **Add search** - Add to filter logic
6. **Add charts** - Add new component

### Architecture Supports
- Multiple users (with auth)
- Cloud storage (replace localStorage)
- Offline-first (already works offline)
- PWA conversion (add manifest)
- Mobile app (React Native)

---

## Summary

This architecture demonstrates:
- ✅ Clean separation of concerns
- ✅ Component composition principles
- ✅ Custom hooks for state management
- ✅ Unidirectional data flow
- ✅ Reusable, testable components
- ✅ Scalable structure
- ✅ Modern React patterns

The design is professional, maintainable, and production-ready.
