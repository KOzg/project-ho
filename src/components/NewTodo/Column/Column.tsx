import { JSX, useContext, useMemo } from 'react';

import ListItem from '../ListItem/ListItem';
import { TodoContext } from '../TodoProvider';

import { getListByStatus } from '../helpers';

import { ColumnProps } from './Column.types';

export default function Column({ status }: ColumnProps) {
  const { todo } = useContext(TodoContext);

  // we gotta memo this guy
  const list = useMemo(() => {
    // grab the head of the current status list
    const listHead = getListByStatus({ status: status, todo: todo }).head;
    // check hash lookup to get the actual head item
    let item = todo.idLookup[listHead];
    // initialize the array with each todo item - gotta be a jsx element
    const listItems: JSX.Element[] = [];

    // simple while loop that pushes the head, then checks next
    // stops when we reach the tail
    // classic leetcode linkedlist iterator
    while (item) {
      listItems.push(
        <li key={item.id}>
          <ListItem title={item.title} />
        </li>
      );

      if (!item.next) {
        break;
      }
      // iterate to the next item - just get the id, then lookup in hash
      item = todo.idLookup[item.next];
    }

    return listItems;
  }, [status, todo]);

  return (
    <>
      <b>{status}</b>
      <ul>{list}</ul>
    </>
  );
}
