import AddTodo from '@/components/AddTodo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TodoList from '@/components/TodoList';
import { TodosProvider } from '@/context/TodosContext';

export default function Home() {
  return (
    <>
      <div className='bg_image'></div>
      <main>
        <div className='app'>
          <Header />
          <TodosProvider>
            <AddTodo />
            <TodoList />
            <Footer />
          </TodosProvider>
          <p>Drag and drop to reorder list</p>
        </div>
      </main>
    </>
  );
}
