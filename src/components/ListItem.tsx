import Image from 'next/image';
import crossIcon from '@/../public/images/icon-cross.svg';
import Checkbox from './Checkbox';
import { useTodosDispatch } from '@/context/TodosContext';
import { Todo } from '@/interfaces';
import { Draggable } from 'react-beautiful-dnd';
import { completeTodo, deleteTodo, deleteTodoId } from '@/context/actions';
import { useSession } from 'next-auth/react';

export default function ListItem({ text, complete, id, index }: Todo & { index: number }) {
  const dispatch = useTodosDispatch();
  const { data: session } = useSession();

  const handleComplete = () => {
    completeTodo(id, !complete, dispatch);
  };

  const handleDeleteTodo = () => {
    deleteTodo(id, dispatch);
    deleteTodoId(session?.user.id as string, id, dispatch);
  };

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <li
          className={`${snapshot.isDragging ? 'list-item dragging' : 'list-item'}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Checkbox complete={complete} handleComplete={handleComplete} />
          <p>{text}</p>
          <Image src={crossIcon} alt='delete todo' onClick={handleDeleteTodo} />
        </li>
      )}
    </Draggable>
  );
}
