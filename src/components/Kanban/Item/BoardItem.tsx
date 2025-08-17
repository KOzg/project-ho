function BoardItem({
  id,
  title,
  onDeleteHandler,
}: {
  id: string;
  title: string;
  onDeleteHandler: (id: string) => void;
}) {
  return (
    <li>
      <span>{title}</span>
      <button onClick={() => onDeleteHandler(id)}>Delete</button>
    </li>
  );
}

export default BoardItem;
