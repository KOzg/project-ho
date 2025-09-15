export const validateInput = (input: string, items: string[]): string | null => {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return 'Please enter a todo item';
  }

  if (trimmedInput.length <= 2) {
    return 'Item should be longer than 2 characters';
  }

  if (trimmedInput.length > 100) {
    return 'Item should be less than 100 characters long';
  }

  if (items.some(item => item === trimmedInput)) {
    return 'Item already exists';
  }

  return null;
};
