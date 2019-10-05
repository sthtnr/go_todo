import React from 'react';
import axios from 'axios';
import '../style/App.scss';
import '../style/MakeTodo.scss';
import '../style/DeleteAllTodos.scss';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';

const MyVerticallyCenteredModal = props => {
  const handleSubmit = event => {
    event.preventDefault();
    axios.delete('http://localhost:3000/todo/').then(res => {
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
        <Modal.Title>全てのTodoを消去</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>全てのTodoが消去されます</Modal.Body>
        <Modal.Footer>
          <Button variant='danger' type='submit' onClick={props.onHide}>
            全て消去
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

const DeleteAllTodos = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <Button
        variant='danger'
        className='main__btn'
        onClick={() => setModalShow(true)}
      >
        全て消去
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default DeleteAllTodos;
