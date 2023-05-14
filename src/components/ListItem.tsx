import Image from 'next/image';
import crossIcon from '@/../public/images/icon-cross.svg';
import Checkbox from './Checkbox';
import { useTodos, useTodosDispatch } from '@/context/TodosContext';
import { Todo } from '@/interfaces';
import { Draggable } from 'react-beautiful-dnd';

export default function ListItem({ text, complete, id, index }: Todo & { index: number }) {
  const dispatch = useTodosDispatch();
  const { deleteTodo } = useTodos();

  const handleComplete = () => {
    dispatch({ type: 'CHANGE', todo: { text, complete: !complete, id } });
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
          <Image src={crossIcon} alt='delete todo' onClick={() => deleteTodo(id)} />
        </li>
      )}
    </Draggable>
  );
}
