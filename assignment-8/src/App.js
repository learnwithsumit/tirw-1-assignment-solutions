import Card from './components/Card';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';

function App() {
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
      </div>
    </div>
  );
}

export default App;
