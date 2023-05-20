import { useTodos, useTodosDispatch } from '@/context/TodosContext';
import ListItem from './ListItem';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { changeTodosOrder, saveTodoIds } from '@/context/actions';
import { useSession } from 'next-auth/react';

export default function TodoList() {
  const {
    todos,
    filter,
    todoIds: { ids },
  } = useTodos();
  const dispatch = useTodosDispatch();
  const { data: session } = useSession();

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.complete;
    if (filter === 'complete') return todo.complete;
    return todo;
  });
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newTodoIds = Array.from(ids);
    newTodoIds.splice(source.index, 1);
    newTodoIds.splice(destination.index, 0, draggableId);
    changeTodosOrder(newTodoIds, todos, dispatch);
    saveTodoIds(session?.user.id as string, newTodoIds, dispatch);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='droppable-1'>
        {(provided) => (
          <section ref={provided.innerRef} {...provided.droppableProps}>
            <ul className='list'>
              {filteredTodos.map((todo, index) => (
                <ListItem key={todo.id} text={todo.text} complete={todo.complete} id={todo.id} index={index} />
              ))}

              {provided.placeholder}
            </ul>
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
}
