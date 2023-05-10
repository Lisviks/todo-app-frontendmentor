import { useTodos } from '@/context/TodosContext';
import ListItem from './ListItem';

export default function TodoList({ provided }: any) {
  const { todos, filter } = useTodos();

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.complete;
    if (filter === 'complete') return todo.complete;
    return todo;
  });

  return (
    <section ref={provided.innerRef}>
      <ul className='list' {...provided.draggableProps}>
        {filteredTodos.map((todo, index) => (
          <ListItem key={todo.id} text={todo.text} complete={todo.complete} id={todo.id} index={index} />
        ))}
        {provided.placeholder}
      </ul>
    </section>
  );
}
