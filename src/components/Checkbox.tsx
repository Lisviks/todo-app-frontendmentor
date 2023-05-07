import { useEffect, useState } from 'react';

export default function Checkbox({ checked }: { checked: boolean }) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    checked ? setComplete(true) : setComplete(false);
  }, [checked]);

  return <div className={`checkbox ${complete && 'checked'}`} onClick={() => setComplete(!complete)}></div>;
}
