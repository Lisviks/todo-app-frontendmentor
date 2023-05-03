export default function Footer() {
  return (
    <div className='footer'>
      <div className='items-left'>2 items left</div>
      <ul className='view-list'>
        <li className='current'>All</li>
        <li>Active</li>
        <li>Completed</li>
      </ul>
      <div className='clear-completed'>Clear Completed</div>
    </div>
  );
}
