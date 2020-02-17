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
        initialTodos.sort((a, b) => a.deadline.localeCompare(b.deadline))
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
          <div>
            {todos.length === 0 ? (
              <WhenTodosIsNull />
            ) : (
              <WhenTodosIsNotNull todos={todos} setTodos={setTodos} />
            )}
          </div>
        </main>
      </Container>
    </>
  )
}

const WhenTodosIsNull = () => {
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

const WhenTodosIsNotNull = props => {
  const handleCheckById = i => {
    let textStyle = document.getElementById(i).style.textDecoration
    if (textStyle === '') {
      document.getElementById(i).style.textDecoration = 'line-through'
    } else {
      document.getElementById(i).style.textDecoration = ''
    }
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card className='main__card'>
          <Card.Body>
            {props.todos.map(todo => (
              <div key={todo.id}>
                <div className='main__card__inner-first'>
                  <span id={todo.id}>
                    {props.todos.indexOf(todo) + 1}: {todo.content}
                  </span>
                </div>
                <div className='main__card__inner-second'>
                  <span>~{todo.deadline}</span>
                  <span>
                    <UpdateTodo
                      todoId={todo.id}
                      todoIndex={props.todos.indexOf(todo) + 1}
                      todoContent={todo.content}
                      todoDeadline={todo.deadline}
                      todos={props.todos}
                      setTodos={props.setTodos}
                    />
                  </span>
                  <span>
                    <button
                      type='button'
                      className='btn-icon'
                      onClick={() => {
                        handleCheckById(todo.id)
                      }}
                    >
                      <i className='fa fa-check' aria-hidden='true'></i>
                    </button>
                  </span>
                  <span>
                    <DeleteTodo
                      todoId={todo.id}
                      todoIndex={props.todos.indexOf(todo) + 1}
                      todoContent={todo.content}
                      todoDeadline={todo.deadline}
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
