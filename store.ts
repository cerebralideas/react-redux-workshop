import * as Redux from 'redux';

interface Todo {
	id: number;
	title: string;
	completed: boolean;
}
interface State {
	todos: Todo[];
}
interface Action {
	type: string,
	id?: number,
	title?: string,
	completed?: boolean
}

let reduxStore,
	initialState = {
		todos: [
			{ id: 0, title: 'Learn React Basics', completed: false }
		]
	};

function todoReducer(state: State, action: Action): State {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				todos: state.todos.concat({ id: state.todos.length, title: action.title, completed: false })
			};
		case 'COMPLETE_TODO':
			let completeTodo = function completeTodo(): State {
				var startArray = state.todos.slice(0, action.id),
					todo = state.todos[action.id],
					endArray = state.todos.slice(action.id + 1, state.todos.length);

				return {
					todos: startArray.concat(
							[{ id: todo.id, title: todo.title, completed: action.completed }],
							endArray
						)
				}
			};
			return completeTodo();
		default:
			return state;
	}
}

reduxStore = Redux.createStore(todoReducer, initialState);
reduxStore.subscribe(
	function logStore() {
		console.log(reduxStore.getState());
	}
);

export default reduxStore;
