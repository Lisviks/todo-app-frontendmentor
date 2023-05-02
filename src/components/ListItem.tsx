import Image from 'next/image';
import crossIcon from '@/../public/images/icon-cross.svg';
import Checkbox from './Checkbox';

interface Props {
  todo: string;
  complete: boolean;
}

export default function ListItem({ todo, complete }: Props) {
  return (
    <li className='list-item'>
      <Checkbox checked={complete} />
      <p>{todo}</p>
      <Image src={crossIcon} alt='delete todo' />
    </li>
  );
}
