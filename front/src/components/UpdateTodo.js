import React from 'react';
import axios from 'axios';
import '../style/App.scss';
import '../style/MakeTodo.scss';
import { Button, Modal } from 'react-bootstrap';

const MyVerticallyCenteredModal = props => {
  const todoId = props.todoId;
  const todoContent = props.todoContent;
  const todoDeadline = props.todoDeadline;
  const [Content, setContent] = React.useState('お前はもう死んでいる');
  const [Deadline, setDeadline] = React.useState(new Date().toLocaleString());
  const handleContentChange = event => {
    setContent(event.target.value);
  };
  const handleDeadlineChange = event => {
    setDeadline(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    const requestData = {
      content: Content,
      deadline: Deadline,
    };
    axios.put(`http://150.95.174.151:8000/todo/${todoId}`, requestData,
    ).then(res => {
      props.view();
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
            {props.todoIndex}
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
        todoId={props.todoId}
        todoIndex={props.todoIndex}
        todoContent={props.todoContent}
        todoDeadline={props.todoDeadline}
        view={props.view}
      />
    </React.Fragment>
  );
};

const fullchain = ""
export default UpdateTodo;
