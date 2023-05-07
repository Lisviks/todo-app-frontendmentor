import AddTodo from '@/components/AddTodo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TodoList from '@/components/TodoList';
import { ThemeContextProvider } from '@/context/ThemeContext';

export default function Home() {
  return (
    <>
      <div className='bg_image'></div>
      <main>
        <div className='app'>
          <ThemeContextProvider>
            <Header />
          </ThemeContextProvider>
          <AddTodo />
          <TodoList />
          <Footer />
          <p>Drag and drop to reorder list</p>
        </div>
      </main>
    </>
  );
}
