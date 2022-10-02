import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const EditForm = ({ todoText, handleSubmit }) => {
  const [text, setText] = useState(todoText || '');
  const focusInput = useRef();
  useEffect(() => {
    if (focusInput.current) {
      focusInput.current.focus();
    }
  }, [focusInput]);

  return (
    <form onSubmit={(e) => handleSubmit(e, text)}>
      <input
        ref={focusInput}
        type="text"
        className="focus:outline-none focus:bg-transparent w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};
export default EditForm;
