import React, { useState } from 'react'
import moment from 'moment'
import TimePicker from 'rc-time-picker'
import axios from 'axios'
import '../style/App.scss'
import '../style/MakeTodo.scss'
import 'rc-time-picker/assets/index.css'
import { Button, Modal } from 'react-bootstrap'

const VerticallyCenteredModal = props => {
  const [content, setContent] = useState(null)
  const [deadline, setDeadline] = useState('00:00')

  const handleDeadlineChange = event => {
    setDeadline(event.format('HH:mm'))
  }
  const handleSubmit = event => {
    event.preventDefault()
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const requestData = {
      content,
      deadline,
      done: false
    }
    axios.post(BASE_URL, requestData).then(res => {
      props.setTodos(props.todos.concat(res.data))
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
        <Modal.Title>新しくTodoを作成</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className='control'>
            <label htmlFor='tasknumber'>タスク番号</label>
            {props.todoNextNumber}
          </div>
          <div className='control'>
            <label htmlFor='content'>内容</label>
            <textarea
              id='content'
              onChange={({ target }) => {
                setContent(target.value)
              }}
            />
          </div>
          <div className='control'>
            <label htmlFor='deadline'>締め切り</label>
            <TimePicker
              defaultValue={moment('00:00', 'HH:mm')}
              showSecond={false}
              allowEmpty={false}
              minuteStep={5}
              id='deadline'
              onChange={handleDeadlineChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' type='submit' onClick={props.onHide}>
            作成
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

const MakeTodo = props => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <div>
      <Button
        variant='success'
        className='main__btn'
        onClick={() => setModalShow(true)}
      >
        作成
      </Button>

      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        todoNextNumber={props.todoNextNumber}
        todos={props.todos}
        setTodos={props.setTodos}
      />
    </div>
  )
}

export default MakeTodo
