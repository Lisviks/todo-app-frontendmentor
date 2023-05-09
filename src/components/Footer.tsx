import { useTodos, useTodosDispatch } from '@/context/TodosContext';

export default function Footer() {
  const { todos, filter } = useTodos();
  const dispatch = useTodosDispatch();
  const todosLeft = todos.filter((todo) => !todo.complete).length;

  const changeFilter = (newFilter: string) => {
    dispatch({ type: 'FILTER_TODO', filter: newFilter });
  };

  return (
    <div className='footer'>
      <div className='items-left'>{todosLeft} items left</div>
      <ul className='view-list'>
        <li className={filter === 'all' ? 'current' : ''} onClick={() => changeFilter('all')}>
          All
        </li>
        <li className={filter === 'active' ? 'current' : ''} onClick={() => changeFilter('active')}>
          Active
        </li>
        <li className={filter === 'current' ? 'current' : ''} onClick={() => changeFilter('current')}>
          Completed
        </li>
      </ul>
      <div className='clear-completed'>Clear Completed</div>
    </div>
  );
}
