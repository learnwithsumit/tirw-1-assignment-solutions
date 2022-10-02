import { useState } from 'react';
import { useSelector } from 'react-redux';

import tickImage from '../assets/images/double-tick.png';
import noteImage from '../assets/images/notes.png';
import plusImage from '../assets/images/plus.png';
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from '../features/api/apiSlice';

export default function Header() {
  const [input, setInput] = useState('');

  const { status, colors } = useSelector((state) => state.filter);
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosQuery({ status, colors });
  const [addTodo] = useAddTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addTodo({ text: input, completed: false });
    setInput('');
  };

  const completeHadler = () => {
    todos
      .filter((todo) => !todo.completed)
      .forEach((todo) => {
        editTodo({ id: todo.id, data: { completed: true } });
      });
  };

  const handleClearCompleted = () => {
    todos.forEach((todo) => {
      const { id, completed } = todo;
      if (completed) {
        deleteTodo(id);
      }
    });
  };

  return (
    <div>
      <form
        className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
        onSubmit={submitHandler}
      >
        <img src={noteImage} className="w-6 h-6" alt="Add todo" />
        <input
          type="text"
          placeholder="Type your todo"
          className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
          value={input}
          onChange={handleInput}
          required
        />
        <button
          type="submit"
          className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
        ></button>
      </form>

      <ul className="flex justify-between my-4 text-xs text-gray-500">
        <li className="flex space-x-1 cursor-pointer" onClick={completeHadler}>
          <img className="w-4 h-4" src={tickImage} alt="Complete" />
          <div className="relative">
            <span className="group">
              Complete All Tasks
              <div className="absolute -top-20 -left-12 bg-white w-[300px] p-4 shadow-md hidden group-hover:block">
                This option is not supported by json-server.
                <br />
                So implemented by loop
              </div>
            </span>
          </div>
        </li>

        <li className="cursor-pointer" onClick={handleClearCompleted}>
          <div className="relative">
            <span className="group">
              Clear completed
              <div className="absolute -top-20 -left-12 bg-white w-[300px] p-4 shadow-md hidden group-hover:block">
                This option is not supported by json-server.
                <br />
                So implemented by loop
              </div>
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
