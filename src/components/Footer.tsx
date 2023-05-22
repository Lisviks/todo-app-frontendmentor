import { useTodos, useTodosDispatch } from '@/context/TodosContext';
import { deleteCompleteTodos, saveTodoIds } from '@/context/actions';
import { useSession } from 'next-auth/react';

export default function Footer() {
  const {
    todos,
    filter,
    todoIds: { ids },
  } = useTodos();
  const dispatch = useTodosDispatch();
  const { data: session } = useSession();
  const todosLeft = todos.filter((todo) => !todo.complete).length;

  const changeFilter = (newFilter: string) => {
    dispatch({ type: 'FILTER_TODO', filter: newFilter });
  };

  const handleDeleteComplete = () => {
    const filteredTodoIds = ids.filter((id, index) => {
      if (!todos[index].complete) {
        return id;
      }
    });
    deleteCompleteTodos(dispatch);
    saveTodoIds(session?.user.id as string, filteredTodoIds, dispatch);
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
        <li className={filter === 'complete' ? 'current' : ''} onClick={() => changeFilter('complete')}>
          Completed
        </li>
      </ul>
      <div className='clear-completed' onClick={handleDeleteComplete}>
        Clear Completed
      </div>
    </div>
  );
}
