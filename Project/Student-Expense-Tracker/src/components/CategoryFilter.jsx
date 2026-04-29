// Filter component to show expenses by category

export function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = ['All', 'Food', 'Transport', 'Studies', 'Entertainment', 'Other'];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`rounded px-4 py-2 font-medium transition ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
