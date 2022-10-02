import { editTitle } from '../actions';

const editText = (todoId, newText, setIsEditing) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        text: newText,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const todo = await response.json();

    dispatch(editTitle(todo.id, todo.text));
    // this should be false after the data change in the server
    setIsEditing(false);
  };
};

export default editText;
