import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchTodos from '../redux/todos/thunk/fetchTodos';
import ListContainer from './ListContainer';
import Todo from './Todo';

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters);


  const filterByIncompleted = (todo) => {
    return !todo.completed;
  };
  const filterByStatus = (todo) => {
    const { status } = filters;
    switch (status) {
      case 'Complete':
        return todo.completed;

      case 'Incomplete':
        return !todo.completed;

      default:
        return true;
    }
  };

  const filterByColors = (todo) => {
    const { colors } = filters;
    if (colors.length > 0) {
      return colors.includes(todo?.color);
    }
    return true;
  };

  return (
    <ListContainer>
      {todos
        .filter(filterByIncompleted)
        .filter(filterByStatus)
        .filter(filterByColors)
        .map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
    </ListContainer>
  );
}
