import { useRef } from 'react';

const NewTodo = () => {
  const todoTextInputRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // 값이 아직 없을수도 있어서 옵셔널체이닝(?)
    // 느낌표연산자(!) 를 넣어주면 이시점에는 확실하게 타입에 맞는 값이 있다고 지정 (100% 확신)
    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      //throw an error
      return;
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='text'>Todo Text</label>
      <input type='text' id='text' ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
