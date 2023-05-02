interface Props {
  checked: boolean;
}

export default function Checkbox({ checked }: Props) {
  return (
    <div className={`checkbox ${checked && 'checked'}`}>
      <input type='checkbox' checked={checked} />
    </div>
  );
}
