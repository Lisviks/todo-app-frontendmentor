import { useTodos } from '@/context/TodosContext';
import ListItem from './ListItem';

export default function TodoList() {
  const { todos, filter } = useTodos();

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.complete;
    if (filter === 'complete') return todo.complete;
    return todo;
  });

  return (
    <section>
      <ul className='list'>
        {filteredTodos.map((todo) => (
          <ListItem key={todo.id} text={todo.text} complete={todo.complete} id={todo.id} />
        ))}
      </ul>
    </section>
  );
}
