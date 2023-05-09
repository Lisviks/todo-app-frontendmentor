import { useTodos } from '@/context/TodosContext';

export default function Footer() {
  const todos = useTodos();
  const todosLeft = todos.filter((todo) => !todo.complete).length;

  return (
    <div className='footer'>
      <div className='items-left'>{todosLeft} items left</div>
      <ul className='view-list'>
        <li className='current'>All</li>
        <li>Active</li>
        <li>Completed</li>
      </ul>
      <div className='clear-completed'>Clear Completed</div>
    </div>
  );
}
