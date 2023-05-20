import AddTodo from '@/components/AddTodo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SignIn from '@/components/SignIn';
import TodoList from '@/components/TodoList';
import { TodosProvider } from '@/context/TodosContext';
import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';

export default function Home() {
  return (
    <>
      <div className='bg_image'></div>
      <main>
        <div className='app'>
          <Header />
          <SignIn />
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext();
  return { props: { data: [] } };
};
