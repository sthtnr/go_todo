import React from 'react';
import axios from 'axios';
import '../style/App.scss';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import MakeTodo from './MakeTodo';
import DeleteAllTodos from './DeleteAllTodos';

export default class App extends React.Component {
  state = {
    todos: [],
    todoIsNull: true,
  };
  componentDidMount() {
    axios.get('http://localhost:3000/todo/').then(res => {
      const todos = res.data;
      this.setState({ todos });
      this.setState({ todoIsNull: todos === null ? true : false });
    });
  }
  render() {
    return (
      <Container className='container'>
        <header className='header'></header>
        <main>
          <Row>
            <Col sm={3}></Col>
            <Col sm={3}>
              <MakeTodo />
            </Col>
            <Col sm={3}>
              <DeleteAllTodos />
            </Col>
            <Col sm={3}></Col>
          </Row>
          <CardContents
            todoIsNull={this.state.todoIsNull}
            todos={this.state.todos}
          />
        </main>
      </Container>
    );
  }
}

const CardContents = props => {
  const todoIsNull = props.todoIsNull;
  if (todoIsNull) {
    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className='main__card'>
            <Card.Body>現在Todoはありません</Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card className='main__card'>
          <Card.Body>
            <div>
              {props.todos.map(todo => (
                <div key={todo.Tasknumber}>
                  <div className='main__card__inner-first'>
                    <span>
                      {todo.Tasknumber}: {todo.Content}
                    </span>
                  </div>
                  <div className='main__card__inner-second'>
                    <span>{todo.Deadline}</span>
                    <span>
                      <button type='button' className='btn-icon'>
                        <i className='fa fa-pencil-alt'></i>
                      </button>
                    </span>
                    <span>
                      <button type='button' className='btn-icon'>
                        <i className='fa fa-check' aria-hidden='true'></i>
                      </button>
                    </span>
                    <span>
                      <button type='button' className='btn-icon'>
                        <i className='fa fa-ban' aria-hidden='true'></i>
                      </button>
                    </span>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
