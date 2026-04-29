// Custom hook for managing expense state and logic
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'student_expenses';

export function useExpenses() {
  // State for storing all expenses
  const [expenses, setExpenses] = useState([]);
  
  // State for filtered view
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem(STORAGE_KEY);
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  // Add a new expense
  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(), // Simple unique ID generation
    };
    setExpenses([newExpense, ...expenses]);
  };

  // Delete an expense by id
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Filter expenses by category
  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter((expense) => expense.category === selectedCategory);

  // Calculate total spending
  const totalSpent = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate spending by category
  const categoryTotals = calculateCategoryTotals(expenses);

  return {
    expenses,
    filteredExpenses,
    selectedCategory,
    totalSpent,
    categoryTotals,
    addExpense,
    deleteExpense,
    setSelectedCategory,
  };
}

// Helper function to calculate total spending per category
function calculateCategoryTotals(expenses) {
  const categories = {};

  expenses.forEach((expense) => {
    categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
  });

  return Object.entries(categories).map(([category, total]) => ({
    category,
    total,
  }));
}
