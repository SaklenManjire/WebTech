// Form component for adding new expenses
import { useState } from 'react';

export function ExpenseForm({ onSubmit }) {
  // Form state
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);

  const categories = ['Food', 'Transport', 'Studies', 'Entertainment', 'Other'];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!amount || !description.trim() || parseFloat(amount) <= 0) {
      alert('Please fill in all fields with valid data');
      return;
    }

    // Call parent callback with expense data
    onSubmit({
      category,
      amount: parseFloat(amount),
      description: description.trim(),
      date,
    });

    // Reset form
    setCategory('Food');
    setAmount('');
    setDescription('');
    setDate(today);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Add Expense</h2>

      {/* Category field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Amount field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          step="0.01"
          min="0"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Description field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Lunch at cafeteria"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Date field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none"
      >
        Add Expense
      </button>
    </form>
  );
}
