import React from 'react';
import axios from 'axios';
import '../style/App.scss';
import '../style/MakeTodo.scss';
import '../style/DeleteAllTodos.scss';

const DeleteTodo = props => {
  const todoTaskNumber = props.todoTaskNumber;
  const requestData = {
    task_number: props.todoTaskNumber,
  };
  return (
    <button
      type='button'
      className='btn-icon'
      onClick={() => {
        axios
          .delete(`http://localhost:3000/todo/${todoTaskNumber}`, requestData)
          .then(res => {
            console.log(res);
            console.log(res.data);
          });
      }}
    >
      <i className='fa fa-ban' aria-hidden='true'></i>
    </button>
  );
};

export default DeleteTodo;
