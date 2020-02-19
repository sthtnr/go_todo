import React, { useState } from 'react'
import moment from 'moment'
import TimePicker from 'rc-time-picker'
import axios from 'axios'
import '../style/App.scss'
import '../style/MakeTodo.scss'
import { Button, Modal } from 'react-bootstrap'

const VerticallyCenteredModal = props => {
  const [content, setContent] = useState(todoContent)
  const [deadline, setDeadline] = useState(todoDeadline)

  const todoId = props.todoId
  const todoContent = props.todoContent
  const todoDeadline = props.todoDeadline
  const handleDeadlineChange = event => {
    setDeadline(event.format('HH:mm'))
  }
  const handleSubmit = event => {
    event.preventDefault()
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const requestData = {
      content,
      deadline
    }
    axios.put(`${BASE_URL}${todoId}`, requestData).then(res => {
      props.setTodos(
        props.todos.map(todo => (todo.id !== todoId ? todo : res.data))
      )
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
              onChange={({ target }) => {
                setContent(target.value)
              }}
            />
          </div>
          <div className='control'>
            <label htmlFor='deadline'>締め切り</label>
            <TimePicker
              defaultValue={moment(todoDeadline, 'HH:mm')}
              showSecond={false}
              allowEmpty={false}
              minuteStep={5}
              id='deadline'
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
  )
}

const UpdateTodo = props => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <button
        type='button'
        className='btn-icon'
        onClick={() => setModalShow(true)}
      >
        <i className='fa fa-pencil'></i>
      </button>
      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        todoId={props.todoId}
        todoIndex={props.todoIndex}
        todoContent={props.todoContent}
        todoDeadline={props.todoDeadline}
        todos={props.todos}
        setTodos={props.setTodos}
      />
    </>
  )
}

export default UpdateTodo
