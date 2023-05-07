import { useTodos } from '@/context/TodosContext';
import ListItem from './ListItem';

export default function TodoList() {
  const todos = useTodos();

  return (
    <section>
      <ul className='list'>
        {todos.map((todo) => (
          <ListItem key={todo.id} text={todo.text} complete={todo.complete} id={todo.id} />
        ))}
      </ul>
    </section>
  );
}
