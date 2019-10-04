import React from 'react';
import axios from 'axios';
import './App.scss';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import MakeTodo from './MakeTodo';

export default class App extends React.Component {
  state = {
    todos: [],
  };
  componentDidMount() {
    axios.get('http://localhost:3000/todo/').then(res => {
      const todos = res.data;
      this.setState({ todos });
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
              {/* <Button className='main__btn'>作成</Button> */}
              <MakeTodo />
            </Col>
            <Col sm={3}>
              <Button type='submit' className='main__btn'>
                全て消去
              </Button>
            </Col>
            <Col sm={3}></Col>
          </Row>

          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Card className='main__card'>
                <Card.Body>
                  <div>
                    {this.state.todos.map(todo => (
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
        </main>
      </Container>
    );
  }
}
