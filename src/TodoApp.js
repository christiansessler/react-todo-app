import React from 'react';
import './TodoApp.css';
import TodoList from './TodoList';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    if (localStorage.getItem('items')) {
      console.log('Found');
      this.state = {
        items: JSON.parse(localStorage.getItem('items')),
        title: ''
      };
    } else {
      this.state = {
        items: [],
        title: ''
      };
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCompletion = this.handleCompletion.bind(this);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    console.log('Item was submited: ' + this.state.title);

    if (!this.state.title.length) {
      return;
    }

    const newTodo = {
      title: this.state.title,
      id: Date.now()
    };

    this.setState(
      state => ({
        items: state.items.concat(newTodo),
        title: ''
      }),
      () => {
        localStorage.setItem('items', JSON.stringify(this.state.items));
      }
    );
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleCompletion(id) {
    this.setState(
      {
        items: this.state.items.filter(value => {
          return value.id !== id;
        })
      },
      () => {
        localStorage.setItem('items', JSON.stringify(this.state.items));
      }
    );
  }

  render() {
    if (this.state.items && this.state.items.length > 0) {
      document.title = '(' + this.state.items.length + ") Todo's";
    } else {
      document.title = "Todo's";
    }

    return (
      <div className="container">
        <h1>Todo's</h1>
        <form onSubmit={this.onSubmitHandler}>
          <input
            name="todoInput"
            onChange={this.handleChange}
            value={this.state.title}
            placeholder="Todo"
          />
          <input type="submit" value="submit" />
        </form>

        <div className="todoList">
          <TodoList items={this.state.items} onClick={this.handleCompletion} />
        </div>
      </div>
    );
  }
}

export default TodoApp;
