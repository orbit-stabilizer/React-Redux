import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TodoAdd from './components/todo_add';
import TodoList from './components/todo_list';

export default class App extends Component {
	constructor(props) {
		super(props);

		const displayStatus = { ALL: 0, ACTIVE: 1, COMPLETED: 2 };

		// todo = {value, status, id} # for documentation purposes

		this.state = {
			todos: [],
			id: 0,
			showStatus: displayStatus.ALL
		};
	}

	render() {
		return (
			<div>
				<h3 className="text-center">todos</h3>
				<TodoAdd handleAddTodo={(value) => this.handleAddTodo(value)} />
				<TodoList
					todos={this.state.todos}
					handleDeleteTodo={this.handleDeleteTodo}
					handleToggleStatusTodo={this.handleToggleStatusTodo}
				/>
			</div>
		);
	}

	handleAddTodo = (value) => {
		const todo = { value: value, status: true, id: this.state.id };
		this.setState({ todos: [ ...this.state.todos, todo ] });

		let id = this.state.id;
		id++;
		this.setState({ id });
	};

	handleDeleteTodo = (id) => {
		const todos = this.state.todos.filter((todo) => todo.id !== id);
		this.setState({ todos });
	};

	handleToggleStatusTodo = (id) => {
		let todos = this.state.todos;
		const todoIndex = todos.findIndex((todo) => todo.id === id);
		const updatedTodo = { ...todos[todoIndex], status: !todos[todoIndex].status };
		todos[todoIndex] = updatedTodo;
		this.setState({ todos });
	};

	handleClearCompletedTodos = () => {
		const todos = this.state.filter((todo) => todo.status !== false);
		this.setState({ todos });
	};

	handleShowStatusChange = (showStatus) => {
		this.setState({ showStatus });
	};
}

ReactDOM.render(<App />, document.querySelector('#root'));
