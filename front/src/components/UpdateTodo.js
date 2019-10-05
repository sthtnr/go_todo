import React from 'react';
import axios from 'axios';
import '../style/App.scss';
import '../style/MakeTodo.scss';
import '../style/DeleteAllTodos.scss';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';

const MyVerticallyCenteredModal = props => {
  const todoTaskNumber = props.todoTaskNumber;
  const todoContent = props.todoContent;
  const todoDeadline = props.todoDeadline;
  const [TaskNumber, setTaskNumber] = React.useState(4649);
  const [Content, setContent] = React.useState(null);
  const [Deadline, setDeadline] = React.useState(new Date().toLocaleString());
  const handleTaskNumberChange = event => {
    setTaskNumber(event.target.value);
  };
  const handleContentChange = event => {
    setContent(event.target.value);
  };
  const handleDeadlineChange = event => {
    setDeadline(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    const requestData = {
      task_number: TaskNumber,
      content: Content,
      deadline: Deadline,
    };
    axios
      .put(`http://localhost:3000/todo/${todoTaskNumber}`, requestData)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Todoを変更</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className='control'>
            <label htmlFor='tasknumber'>タスク番号</label>
            <input
              type='text'
              id='tasknumber'
              placeholder={todoTaskNumber}
              onChange={handleTaskNumberChange}
            />
          </div>
          <div className='control'>
            <label htmlFor='content'>内容</label>
            <textarea
              id='content'
              placeholder={todoContent}
              onChange={handleContentChange}
            />
          </div>
          <div className='control'>
            <label htmlFor='deadline'>締め切り</label>
            <input
              type='text'
              id='deadline'
              placeholder={todoDeadline}
              onChange={handleDeadlineChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' onClick={props.onHide}>
            変更
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

const UpdateTodo = props => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <React.Fragment>
      <button
        type='button'
        className='btn-icon'
        onClick={() => setModalShow(true)}
      >
        <i className='fa fa-pencil-alt'></i>
      </button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        todoTaskNumber={props.todoTaskNumber}
        todoContent={props.todoContent}
        todoDeadline={props.todoDeadline}
      />
    </React.Fragment>
  );
};

export default UpdateTodo;
