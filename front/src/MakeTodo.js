import React from 'react';
import axios from 'axios';
import './App.scss';
import './MakeTodo.scss';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';

const MyVerticallyCenteredModal = props => {
  const [taskNumber, setTaskNumber] = React.useState(4649);
  const [content, setContent] = React.useState(null);
  const [deadline, setDeadline] = React.useState(new Date().toLocaleString());
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
      task_number: taskNumber,
      content: content,
      deadline: deadline,
    };
    axios.post('http://localhost:3000/todo/', requestData).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>新しくTodoを作成</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className='control'>
            <label htmlFor='tasknumber'>タスク番号</label>
            <input
              type='text'
              id='tasknumber'
              onChange={handleTaskNumberChange}
            />
          </div>
          <div className='control'>
            <label htmlFor='content'>内容</label>
            <textarea id='content' onChange={handleContentChange} />
          </div>
          <div className='control'>
            <label htmlFor='deadline'>締め切り</label>
            <input type='text' id='deadline' onChange={handleDeadlineChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' onClick={props.onHide}>
            作成
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

const MakeTodo = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <Button className='main__btn' onClick={() => setModalShow(true)}>
        作成
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default MakeTodo;