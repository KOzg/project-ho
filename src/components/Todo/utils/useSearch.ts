import { use, useMemo } from 'react';
import { TodoContext } from '../TodoProvider';
import useDebounce from './useDebounce';

export default function useSearch(searchTerm: string) {
  const { items } = use(TodoContext);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm) {
      return null;
    }

    return items.filter(item =>
      item.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm, items]);

  return searchResults;
}
