// Main application component
// This is the entry point that orchestrates the entire expense tracker app
import { useExpenses } from './hooks';
import {
  ExpenseForm,
  ExpenseList,
  CategoryFilter,
  Statistics,
} from './components';

export default function App() {
  // Get all state and methods from the custom hook
  const {
    filteredExpenses,
    selectedCategory,
    totalSpent,
    categoryTotals,
    addExpense,
    deleteExpense,
    setSelectedCategory,
  } = useExpenses();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Expense Tracker</h1>
          <p className="mt-2 text-gray-600">
            Track your daily expenses and manage your budget efficiently
          </p>
        </div>

        {/* Main layout - two columns */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column - Form and Stats */}
          <div className="space-y-6 lg:col-span-1">
            {/* Expense form */}
            <ExpenseForm onSubmit={addExpense} />

            {/* Statistics section */}
            <Statistics categoryTotals={categoryTotals} totalSpent={totalSpent} />
          </div>

          {/* Right column - Filter and List */}
          <div className="space-y-6 lg:col-span-2">
            {/* Category filter */}
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Filter by Category</h2>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {/* Expense list */}
            <ExpenseList
              expenses={filteredExpenses}
              onDelete={deleteExpense}
              totalSpent={totalSpent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
