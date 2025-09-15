import {
  ChangeEvent,
  FormEvent,
  use,
  useCallback,
  useRef,
  useState,
} from 'react';
import { TodoContext } from '../SimpleTodoProvider';
import { ActionTypes } from '../SimpleTodoProvider.types';
import { validateInput } from './helpers';


export default function useAddTodo() {
  const [item, setItem] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { state, dispatch } = use(TodoContext);

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
      const newItems = [item, ...state.items];
      const validationError = validateInput(item, state.items);
      if (validationError) {
        setError(validationError);
        return;
      }
      dispatch({type:'SET_ITEMS', payload: newItems})
      setItem('');
       dispatch({type: ActionTypes.SET_ANNOUNCEMENT, payload: `Added: ${item}`});

      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [item, state.items, dispatch]
  );

  return {
    item,
    error,
    inputRef,
    handleInputChange,
    handleSubmit,
  };
}
