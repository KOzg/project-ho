export type TodoItem = {
  id: number;
  title: string;
  status: ItemStatusEnum;
};

export type ToDoType = {
  items: TodoItem[];
};

export enum ItemStatusEnum {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}
