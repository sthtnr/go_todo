import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import '../style/App.scss'
import { Container, Row, Col, Card } from 'react-bootstrap'
import MakeTodo from './MakeTodo'
import DeleteAllTodos from './DeleteAllTodos'
import DeleteTodo from './DeleteTodo'
import UpdateTodo from './UpdateTodo'

const App = () => {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BASE_URL
    axios.get(BASE_URL).then(res => {
      const initialTodos = res.data
      if (initialTodos !== null) {
        initialTodos.sort((a, b) => a.Deadline.localeCompare(b.Deadline))
        setTodos(initialTodos)
      } else {
        setTodos([])
      }
    })
  }, [])
  return (
    <>
      <header>
        <h1>TodoApp for {moment().format('MM/DD')}</h1>
      </header>
      <Container className='container'>
        <main>
          <Row>
            <Col sm={3}></Col>
            <Col sm={3}>
              <MakeTodo
                todoNextNumber={todos === null ? 1 : todos.length + 1}
                todos={todos}
                setTodos={setTodos}
              />
            </Col>
            <Col sm={3}>
              <DeleteAllTodos setTodos={setTodos} />
            </Col>
            <Col sm={3}></Col>
          </Row>
          <CardContents todos={todos} setTodos={setTodos} />
        </main>
      </Container>
    </>
  )
}

const CardContents = props => {
  const handleCheckById = i => {
    let textStyle = document.getElementById(i).style.textDecoration
    if (textStyle === '') {
      document.getElementById(i).style.textDecoration = 'line-through'
    } else {
      document.getElementById(i).style.textDecoration = ''
    }
  }
  if (props.todos.length === 0) {
    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className='main__card'>
            <Card.Body>現在Todoはありません</Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card className='main__card'>
          <Card.Body>
            {props.todos.map(todo => (
              <div key={todo.Id}>
                <div className='main__card__inner-first'>
                  <span id={todo.Id}>
                    {props.todos.indexOf(todo) + 1}: {todo.Content}
                  </span>
                </div>
                <div className='main__card__inner-second'>
                  <span>~{todo.Deadline}</span>
                  <span>
                    <UpdateTodo
                      todoId={todo.Id}
                      todoIndex={props.todos.indexOf(todo) + 1}
                      todoContent={todo.Content}
                      todoDeadline={todo.Deadline}
                      todos={props.todos}
                      setTodos={props.setTodos}
                    />
                  </span>
                  <span>
                    <button
                      type='button'
                      className='btn-icon'
                      onClick={() => {
                        handleCheckById(todo.Id)
                      }}
                    >
                      <i className='fa fa-check' aria-hidden='true'></i>
                    </button>
                  </span>
                  <span>
                    <DeleteTodo
                      todoId={todo.Id}
                      todoIndex={props.todos.indexOf(todo) + 1}
                      todoContent={todo.Content}
                      todoDeadline={todo.Deadline}
                      todos={props.todos}
                      setTodos={props.setTodos}
                    />
                  </span>
                </div>
                <hr />
              </div>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default App
