import Image from 'next/image';
import crossIcon from '@/../public/images/icon-cross.svg';
import Checkbox from './Checkbox';
import { useTodosDispatch } from '@/context/TodosContext';
import { Todo } from '@/interfaces';

export default function ListItem({ text, complete, id }: Todo) {
  const dispatch = useTodosDispatch();

  return (
    <li className='list-item'>
      <Checkbox checked={complete} />
      <p>{text}</p>
      <Image
        src={crossIcon}
        alt='delete todo'
        onClick={() =>
          dispatch({
            type: 'DELETE',
            id,
          })
        }
      />
    </li>
  );
}
