import { TodoAction, TodoStateType } from '../TodoProvider.types';

export function todoReducer(state: TodoStateType, action: TodoAction) {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item !== action.payload),
      };
    case 'SET_ANNOUNCEMENT':
      return {
        ...state,
        announcement: action.payload,
      };
    default:
      return state;
  }
}
