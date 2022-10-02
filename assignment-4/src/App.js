import { Provider } from 'react-redux';
import Card from './components/Card';
import CompletedTodos from './components/CompletedTodos';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import store from './redux/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import fetchTodos from './redux/todos/thunk/fetchTodos';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos);
  }, [dispatch]);
  return (
    <div className="grid place-items-center gap-0 bg-blue-100 min-h-screen px-6 space-y-2">
      <Navbar />
      <div className="grid place-items-center gap-4">
        <Card>
          <Header />

          <hr className="mt-4" />

          <TodoList />

          <hr className="mt-4" />

          <Footer />
        </Card>

        <CompletedTodos />
      </div>
    </div>
  );
}

export default App;
