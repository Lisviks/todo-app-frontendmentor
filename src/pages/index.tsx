import AddTodo from '@/components/AddTodo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SignOut from '@/components/SignOut';
import SignInModal from '@/components/SignInModal';
import TodoList from '@/components/TodoList';
import { TodosProvider } from '@/context/TodosContext';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { resetServerContext } from 'react-beautiful-dnd';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <div className='bg_image'></div>
      <main>
        <div className='app'>
          <Header />
          <SignOut />
          <TodosProvider>
            <AddTodo />
            <TodoList />
            <Footer />
          </TodosProvider>
          <p>Drag and drop to reorder list</p>
          {!session && <SignInModal />}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext();
  return { props: { data: [] } };
};
