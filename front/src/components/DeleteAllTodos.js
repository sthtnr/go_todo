import React from 'react'
import axios from 'axios'
import '../style/App.scss'
import { Button, Modal } from 'react-bootstrap'

const MyVerticallyCenteredModal = props => {
  const handleSubmit = event => {
    event.preventDefault()
    axios.delete('http://150.95.174.151:8000/todo/').then(res => {
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
  )
}

const DeleteAllTodos = props => {
  const [modalShow, setModalShow] = React.useState(false)

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
        view={props.view}
      />
    </div>
  )
}

export default DeleteAllTodos
