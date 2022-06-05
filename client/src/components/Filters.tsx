import { SearchFilters } from '../views/ProductsView';
import debounce from 'lodash.debounce';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

const BRANDS = ['MSI', 'Apple', 'Logitech', 'HP', 'Nintendo', 'SanDisk', 'Siemens', 'Reishunger'];

const Filters = ({
  filters,
  setFilters,
}: {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((filters) => ({ ...filters, search: e.target.value }));
  };

  const handleCategoryOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((filters) => ({ ...filters, category: e.target.value === 'All Categories' ? '' : e.target.value }));
  };

  const debouncedHandleSearchChange = debounce(handleSearchChange, 300);

  const [tag, setTag] = useState('');
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleAddTag = (e: any) => {
    e.preventDefault();
    if (tag.trim().length < 2) {
      return;
    }
    setFilters((filters) => ({ ...filters, tags: !filters.tags ? [tag] : [...filters.tags, tag] }));
  };

  const handleRemoveTag = (index: number) => {
    setFilters((filters) => ({ ...filters, tags: filters.tags.filter((_, i) => i !== index) }));
  };

  const handleSortByOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((filters) => ({ ...filters, sortBy: e.target.value.toLowerCase() }));
  };

  const handleBrandOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((filters) => ({ ...filters, brand: e.target.value === 'All Brands' ? '' : e.target.value }));
  };
  return (
    <div className="sticky top-12 flex py-2 z-10 bg-white space-x-2 justify-between">
      <input
        onChange={debouncedHandleSearchChange}
        placeholder="Search..."
        className="rounded-full px-4 py-1 border border-gray-200 w-24"
      ></input>
      <select className="border border-gray-200" onChange={handleCategoryOnChange}>
        <option>All Categories</option>
        {CATEGORIES.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
      <form onSubmit={handleAddTag}>
        <input
          onChange={handleTagChange}
          placeholder="Add Tags..."
          className="w-28 rounded-full px-4 py-1 border border-gray-200"
        ></input>
        <button onClick={handleAddTag} className="h-6 px-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
          Add
        </button>
      </form>
      <div className="flex max-w-[250px] overflow-x-scroll space-x-1 scrollbar-hide">
        {filters.tags &&
          filters.tags.map((tag, i) => (
            <div
              key={tag + uuidv4()}
              className="cursor-pointer rounded-full border border-gray-200 px-2 flex space-x-1 items-center"
            >
              <p>{tag}</p>
              <div className="w-5 h-5 rounded-full border border-gray-200 flex flex-col justify-center items-center text-white bg-gray-200 hover:bg-gray-300">
                <p onClick={() => handleRemoveTag(i)}>x</p>
              </div>
            </div>
          ))}
      </div>
      <select className="border border-gray-200" onChange={handleSortByOnChange}>
        <option>Price asc</option>
        <option>Price desc</option>
      </select>
      <select className="border border-gray-200" onChange={handleBrandOnChange}>
        <option>All Brands</option>
        {BRANDS.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
