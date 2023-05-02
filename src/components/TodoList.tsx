import ListItem from './ListItem';

const todos = [
  {
    todo: 'Workout',
    complete: true,
  },
  {
    todo: 'Coding',
    complete: false,
  },
  {
    todo: 'Complete todo app',
    complete: false,
  },
];

export default function TodoList() {
  return (
    <section>
      <ul className='list'>
        {todos.map((todo) => (
          <ListItem key={todo.todo} todo={todo.todo} complete={todo.complete} />
        ))}
      </ul>
    </section>
  );
}
