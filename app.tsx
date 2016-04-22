/// <reference path="typings.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxStore from './store';
import { ConnectedForm, ConnectedList } from './containers';

function App() {
	return (
		<div>
			<ConnectedForm />
			<ConnectedList />
		</div>
	);
}

ReactDOM.render(
	<Provider store={ reduxStore }>
		<App />
	</Provider>,
	document.getElementById('root')
);
