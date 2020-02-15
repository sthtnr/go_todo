import React from 'react'
import moment from 'moment'
import TimePicker from 'rc-time-picker'
import axios from 'axios'
import '../style/App.scss'
import '../style/MakeTodo.scss'
import 'rc-time-picker/assets/index.css'
import { Button, Modal } from 'react-bootstrap'

const MyVerticallyCenteredModal = props => {
  const [content, setContent] = React.useState(null)
  const [deadline, setDeadline] = React.useState('00:00')
  const handleContentChange = event => {
    setContent(event.target.value)
  }
  const handleDeadlineChange = event => {
    setDeadline(event.format('HH:mm'))
  }
  const handleSubmit = event => {
    event.preventDefault()
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const requestData = {
      content: content,
      deadline: deadline
    }
    axios.post(BASE_URL).then(res => {
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
            <textarea id='content' onChange={handleContentChange} />
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
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <div>
      <Button
        variant='success'
        className='main__btn'
        onClick={() => setModalShow(true)}
      >
        作成
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        todoNextNumber={props.todoNextNumber}
        view={props.view}
      />
    </div>
  )
}

export default MakeTodo
