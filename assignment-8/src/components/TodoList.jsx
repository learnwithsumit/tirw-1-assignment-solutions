import ListContainer from './ListContainer';
import Todo from './Todo';
import { useGetTodosQuery } from '../features/api/apiSlice';
import { useSelector } from 'react-redux';

export default function TodoList() {
  const { status, colors } = useSelector((state) => state.filter);
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosQuery({ status, colors });
  if (isLoading && !isError) {
    return <h1>Loading...</h1>;
  }
  if (!isLoading && isError) {
    return <h1>something went wrong</h1>;
  }
  return (
    <ListContainer>
      {todos?.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </ListContainer>
  );
}
