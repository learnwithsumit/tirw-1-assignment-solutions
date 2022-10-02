import { useState } from 'react';
import cancelImage from '../assets/images/cancel.png';

import editIcon from '../assets/icons/edit.svg';
import EditForm from './EditForm';
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from '../features/api/apiSlice';

export default function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);

  const { text, id, completed = false, color } = todo;

  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const handleStatusChange = () => {
    if (!completed) {
      editTodo({ id, data: { completed: true } });
    } else {
      editTodo({ id, data: { completed: false } });
    }
  };

  const handleColorChange = (color) => {
    editTodo({ id, data: { color } });
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleSubmit = (e, newText) => {
    e.preventDefault();
    editTodo({ id, data: { text: newText } });
    setIsEditing(false);
  };
  return (
    <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
      <div
        className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
          completed && 'border-green-500 focus-within:border-green-500'
        }`}
      >
        <input
          type="checkbox"
          checked={completed}
          onChange={handleStatusChange}
          className="opacity-0 absolute rounded-full cursor-pointer"
        />
        {completed && (
          <svg
            className="fill-current w-3 h-3 text-green-500 pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>

      <div className={`select-none flex-1 ${completed && 'line-through'}`}>
        {isEditing ? (
          <EditForm todoText={text} handleSubmit={handleSubmit} />
        ) : (
          text
        )}
      </div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
          color === 'green' && 'bg-green-500'
        }`}
        onClick={() => handleColorChange('green')}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
          color === 'yellow' && 'bg-yellow-500'
        }`}
        onClick={() => handleColorChange('yellow')}
      ></div>

      <div
        className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
          color === 'red' && 'bg-red-500'
        }`}
        onClick={() => handleColorChange('red')}
      ></div>
      <img
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        src={editIcon}
        alt="edit"
        onClick={() => handleEdit()}
      />
      <img
        src={cancelImage}
        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
        alt="Cancel"
        onClick={handleDelete}
      />
    </div>
  );
}
