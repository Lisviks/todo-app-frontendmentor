import { useTodos, useTodosDispatch } from '@/context/TodosContext';
import ListItem from './ListItem';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { changeTodosOrder, saveTodoIds } from '@/context/actions';

export default function TodoList() {
  const {
    todos,
    filter,
    todoIds: { _id, ids: todoIds },
  } = useTodos();
  const dispatch = useTodosDispatch();

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

    const newTodoIds = Array.from(todoIds);
    newTodoIds.splice(source.index, 1);
    newTodoIds.splice(destination.index, 0, draggableId);
    changeTodosOrder(newTodoIds, todos, dispatch);
    saveTodoIds(_id, newTodoIds);
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
