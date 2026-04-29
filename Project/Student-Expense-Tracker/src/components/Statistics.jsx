// Statistics component to show spending breakdown

export function Statistics({ categoryTotals, totalSpent }) {
  // Return nothing if no expenses
  if (categoryTotals.length === 0) {
    return null;
  }

  // Get color for each category
  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-orange-200',
      Transport: 'bg-blue-200',
      Studies: 'bg-green-200',
      Entertainment: 'bg-purple-200',
      Other: 'bg-gray-200',
    };
    return colors[category] || colors.Other;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Spending Breakdown</h2>

      <div className="space-y-3">
        {categoryTotals.map((item) => {
          // Calculate percentage of total spending
          const percentage = totalSpent > 0 ? (item.total / totalSpent) * 100 : 0;

          return (
            <div key={item.category}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.category}</span>
                <span className="text-sm font-medium text-gray-900">₹{item.total.toFixed(2)}</span>
              </div>
              {/* Visual progress bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full ${getCategoryColor(item.category)} transition-all`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total summary */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">
          Total spending: <span className="font-bold text-gray-900">₹{totalSpent.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
