import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import ListContainer from './ListContainer';
import Todo from './Todo';
import { clearCompleted } from '../redux/todos/actions';

const CompletedTodos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const filterByCompleted = (todo) => {
    return todo.completed;
  };
  const clearHeandler = () => {
    dispatch(clearCompleted());
  };
  const itemsToRender =
    todos.filter(filterByCompleted).length > 0 ? (
      <Card>
        <ul className="flex justify-between my-4 text-xs text-gray-500">
          <li>Completed Tasks</li>
          <li className="cursor-pointer">
            <div className="relative">
              <span className="group" onClick={clearHeandler}>
                Clear completed
                <div className="absolute -top-24 -left-12 bg-white w-[300px] p-4 shadow-md hidden group-hover:block">
                  This option doesn't change data to the server. Because we
                  can't change multiple data at a time in json-server
                </div>
              </span>
            </div>
          </li>
        </ul>
        <ListContainer>
          {todos.filter(filterByCompleted).map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ListContainer>
      </Card>
    ) : (
      ''
    );
  return itemsToRender;
};
export default CompletedTodos;
