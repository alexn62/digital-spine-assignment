import { SearchFilters } from '../views/ProductsView';
import debounce from 'lodash.debounce';
const Filters = ({ setFilters }: { setFilters: React.Dispatch<React.SetStateAction<SearchFilters>> }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((filters) => ({ ...filters, search: e.target.value }));
  };
  const debouncedHandleSearchChange = debounce(handleSearchChange, 300);
  return (
    <div className="sticky top-12 flex py-2 z-10 bg-white">
      <input
        onChange={debouncedHandleSearchChange}
        placeholder="Search..."
        className="rounded-full px-4 py-1 border border-gray-200"
      ></input>
    </div>
  );
};

export default Filters;
