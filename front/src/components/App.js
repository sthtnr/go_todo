import React from 'react';
import axios from 'axios';
import '../style/App.scss';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import MakeTodo from './MakeTodo';
import DeleteAllTodos from './DeleteAllTodos';
import DeleteTodo from './DeleteTodo';
import UpdateTodo from './UpdateTodo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoIsNull: true,
    };
  }
  componentDidMount() {
    axios.get('http://localhost:3000/todo/').then(res => {
      const todos = res.data;
      this.setState({ todos });
      this.setState({ todoIsNull: todos === null ? true : false });
    });
  }
  render() {
    return (
      <React.Fragment>
        <header>
          <h1>Todo App</h1>
        </header>
        <Container className='container'>
          <main>
            <Row>
              <Col sm={3}></Col>
              <Col sm={3}>
                <MakeTodo todoNextNumber={this.state.todos.length + 1} />
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
      </React.Fragment>
    );
  }
}

const CardContents = props => {
  const todoIsNull = props.todoIsNull;
  const [isChecked, setIsChecked] = React.useState(false);
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
            {props.todos.map(todo => (
              <div key={todo.Id}>
                <div className='main__card__inner-first'>
                  <span className={isChecked ? 'is-checked' : null}>
                    {props.todos.indexOf(todo) + 1}: {todo.Content}
                  </span>
                </div>
                <div className='main__card__inner-second'>
                  <span>{todo.Deadline}</span>
                  <span>
                    <UpdateTodo
                      todoId={todo.Id}
                      todoIndex={props.todos.indexOf(todo) + 1}
                      todoContent={todo.Content}
                      todoDeadline={todo.Deadline}
                    />
                  </span>
                  <span>
                    <button
                      type='button'
                      className='btn-icon'
                      onClick={() => {
                        setIsChecked(!isChecked);
                        console.log(todo.Content);
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
  );
};
