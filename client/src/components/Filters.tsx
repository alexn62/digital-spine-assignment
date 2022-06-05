import { SearchFilters } from '../views/ProductsView';
import debounce from 'lodash.debounce';

const CATEGORIES = [
  'Graphics Card',
  'Laptop',
  'Smartphone',
  'Peripherals',
  'Printers & Ink',
  'Gaming',
  'Storage & Memory',
  'Household',
];

const Filters = ({ setFilters }: { setFilters: React.Dispatch<React.SetStateAction<SearchFilters>> }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((filters) => ({ ...filters, search: e.target.value }));
  };

  const handleCategoryOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((filters) => ({ ...filters, category: e.target.value === 'All Categories' ? '' : e.target.value }));
  };

  const debouncedHandleSearchChange = debounce(handleSearchChange, 300);
  return (
    <div className="sticky top-12 flex py-2 z-10 bg-white px-10">
      <input
        onChange={debouncedHandleSearchChange}
        placeholder="Search..."
        className="rounded-full px-4 py-1 border border-gray-200"
      ></input>
      <select onChange={handleCategoryOnChange}>
        <option>All Categories</option>
        {CATEGORIES.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
