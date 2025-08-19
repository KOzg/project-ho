import {
  ChangeEvent,
  FormEvent,
  use,
  useCallback,
  useRef,
  useState,
} from 'react';
import { TodoContext } from '../TodoProvider';
import { validateInput } from './helpers';

export default function useAddTodo() {
  const [item, setItem] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { items, setItems, announcement, setAnnouncement } = use(TodoContext);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setError('');
      setItem(e.target.value);
    },
    []
  );
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const newItems = [item, ...items];
      const validationError = validateInput(item, items);
      if (validationError) {
        setError(validationError);
        return;
      }
      setItems(newItems);
      setItem('');
      setAnnouncement(`Added: ${item}`);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [item, items, setAnnouncement, setItems]
  );

  return {
    item,
    announcement,
    error,
    inputRef,
    handleInputChange,
    handleSubmit,
  };
}
