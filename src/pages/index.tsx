import AddTodo from '@/components/AddTodo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TodoList from '@/components/TodoList';
import { TodosProvider } from '@/context/TodosContext';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Home() {
  const handleOnDragEnd = () => {};

  return (
    <>
      <div className='bg_image'></div>
      <main>
        <div className='app'>
          <Header />
          <TodosProvider>
            <AddTodo />
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId='droppable-1'>{(provided) => <TodoList provided={provided} />}</Droppable>
            </DragDropContext>
            <Footer />
          </TodosProvider>
          <p>Drag and drop to reorder list</p>
        </div>
      </main>
    </>
  );
}
