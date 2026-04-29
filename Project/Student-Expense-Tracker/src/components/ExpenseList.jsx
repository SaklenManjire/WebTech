// List component to display all expenses
import { ExpenseItem } from './ExpenseItem';

export function ExpenseList({ expenses, onDelete, totalSpent }) {
  // Show empty state if no expenses
  if (expenses.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-500">No expenses yet. Add your first expense above!</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Expenses</h2>

      {/* Expenses list */}
      <div className="space-y-2">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Total spending footer */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Total Spent</span>
          <span className="text-xl font-bold text-blue-600">₹{totalSpent.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
