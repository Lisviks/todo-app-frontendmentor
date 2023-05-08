import { CheckboxInterface } from '@/interfaces';

export default function Checkbox({ complete, handleComplete }: CheckboxInterface) {
  return <div className={`checkbox ${complete && 'checked'}`} onClick={() => handleComplete()}></div>;
}
