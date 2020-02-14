import React from 'react'
import moment from 'moment'
import axios from 'axios'
import '../style/App.scss'
import { Container, Row, Col, Card } from 'react-bootstrap'
import MakeTodo from './MakeTodo'
import DeleteAllTodos from './DeleteAllTodos'
import DeleteTodo from './DeleteTodo'
import UpdateTodo from './UpdateTodo'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }
  componentDidMount() {
    axios.get('http://150.95.174.151:8000/todo/').then(res => {
      const todos = res.data
      if (todos !== null) {
        todos.sort((a, b) => {
          return a.Deadline.localeCompare(b.Deadline)
        })
      }
      this.setState({ todos })
    })
  }
  render() {
    return (
      <React.Fragment>
        <header>
          <h1>TodoApp for {moment().format('MM/DD')}</h1>
        </header>
        <Container className='container'>
          <main>
            <Row>
              <Col sm={3}></Col>
              <Col sm={3}>
                <MakeTodo
                  todoNextNumber={
                    this.state.todos === null ? 1 : this.state.todos.length + 1
                  }
                  view={this.componentDidMount.bind(this)}
                />
              </Col>
              <Col sm={3}>
                <DeleteAllTodos view={this.componentDidMount.bind(this)} />
              </Col>
              <Col sm={3}></Col>
            </Row>
            <CardContents
              todoIsNull={this.state.todos === null}
              todos={this.state.todos}
              view={this.componentDidMount.bind(this)}
            />
          </main>
        </Container>
      </React.Fragment>
    )
  }
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
  const todoIsNull = props.todoIsNull
  if (todoIsNull) {
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
                      view={props.view}
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
                      view={props.view}
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
