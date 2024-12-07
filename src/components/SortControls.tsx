import { SortOrder } from "@/types/product";

interface SortControlsProps {
  categories: string[];
  selectedCategory: string;
  sortOrder: SortOrder;
  onCategoryChange: (category: string) => void;
  onSortChange: (order: SortOrder) => void;
}

function SortControls({
  categories,
  selectedCategory,
  sortOrder,
  onCategoryChange,
  onSortChange,
}: SortControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm mt-5">
      <div className="flex-1">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category
        </label>
        <div className="relative">
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="block w-full appearance-none bg-gray-600 border border-gray-300 rounded-lg py-2.5 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 transition-duration-200 focus:ring-opacity-50 "
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category} className="py-1">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <label
          htmlFor="sort"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Sort by Price
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value as SortOrder)}
            className="block w-full appearance-none bg-gray-600 border border-gray-300 rounded-lg py-2.5 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortControls;
