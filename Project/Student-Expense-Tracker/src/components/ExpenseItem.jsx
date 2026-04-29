// Individual expense item component

export function ExpenseItem({ expense, onDelete }) {
  // Format date for display
  const formattedDate = new Date(expense.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Get category color for visual distinction
  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-orange-100 text-orange-800',
      Transport: 'bg-blue-100 text-blue-800',
      Studies: 'bg-green-100 text-green-800',
      Entertainment: 'bg-purple-100 text-purple-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.Other;
  };

  return (
    <div className="flex items-center justify-between rounded border border-gray-200 bg-white p-4 hover:shadow-md">
      {/* Left section - category, description, date */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${getCategoryColor(expense.category)}`}>
            {expense.category}
          </span>
          <div>
            <p className="font-medium text-gray-900">{expense.description}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </div>

      {/* Right section - amount and delete button */}
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold text-gray-900">₹{expense.amount.toFixed(2)}</span>
        <button
          onClick={() => onDelete(expense.id)}
          className="rounded bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
