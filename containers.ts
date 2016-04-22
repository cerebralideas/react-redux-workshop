import { connect } from 'react-redux';
import { TodoForm, TodoList } from './presentational';

function mapStateToProps_todoList(state) {
	return {
		todos: state
	}
}
function mapDispatchToProps_todoList(dispatch) {
	return {
		completeTodo: function completeTodo(event) {
			dispatch({ type: 'COMPLETE_TODO', id: event.target.id, completed: event.target.checked });
		}
	}
}
function mapDispatchToProps_todoForm(dispatch) {
	return {
		addTodo: function addTodo(event) {
			event.preventDefault();

			dispatch({ type: 'ADD_TODO', title: event.currentTarget.todo.value });

			event.currentTarget.todo.value = '';
		}
	}
}

export let ConnectedForm = connect(
	null,
	mapDispatchToProps_todoForm
)(TodoForm);

export let ConnectedList = connect(
	mapStateToProps_todoList,
	mapDispatchToProps_todoList
)(TodoList);
