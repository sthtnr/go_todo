import React from 'react'
import axios from 'axios'
import '../style/App.scss'
import { Button, Modal } from 'react-bootstrap'

const MyVerticallyCenteredModal = props => {
  const todoId = props.todoId
  const todoContent = props.todoContent
  const todoDeadline = props.todoDeadline
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const handleSubmit = event => {
    event.preventDefault()
    axios.delete(`${BASE_URL}${todoId}`).then(res => {
      props.view()
    })
  }
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Todoを消去</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <p>以下のTodoが消去されます</p>
          <div>タスク番号: {props.todoIndex}</div>
          <div>内容: {todoContent}</div>
          <div>締め切り: {todoDeadline}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' onClick={props.onHide}>
            消去
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

const DeleteTodo = props => {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <React.Fragment>
      <button
        type='button'
        className='btn-icon'
        onClick={() => {
          setModalShow(true)
        }}
      >
        <i className='fa fa-ban' aria-hidden='true'></i>
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
  )
}

export default DeleteTodo
