import { useState } from 'react';

export default function Checkbox() {
  const [complete, setComplete] = useState(false);

  return <div className={`checkbox ${complete && 'checked'}`} onClick={() => setComplete(!complete)}></div>;
}
