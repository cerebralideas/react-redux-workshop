# react-redux-workshop

A simple project for getting my team up to speed with our new technologies.


## Step Zero: Setup!

To start this workshop, you have two options:

1. Pull this in locally with `git clone git@github.com:cerebralix/react-redux-workshop.git` and then run `git checkout 343d1abac5ae57acb03b7adbeceb8238c7af2a98` to grab the starting point for the project.

	> IMPORTANT: I recommend that you don't edit this project, but create your own and just have this as a reference. I will be force pushing changes to this project, so it will most likely cause issues if you edit this.

2. Or, just keep this open in Github and just navigate the code via the commit history.

 At each step, I will provide you a link to the commit that provides the answer, or you can checkout the commit here for the code.


## Step One: Hello, World!

1. In the core React and ReactDOM libraries (what we linked above), you have a few methods off of the exported object that you have to know:
	- `React.createElement`
	- `ReactDOM.render`
2. Using these two methods, create a simple "Hello, World!" react component.

	```
	React.createElement('h1', null, 'Hello, World!');
	```

3. Now, render this component to the DOM:

	```
	ReactDOM.render(
		YOUR REACT ELEMENT HERE,
		document.getElementById('root')
	);
	```

4. Visit the page in the browser to see if it works!
5. Now, I want you to have the `<h1>` element not contain the string, but contain another React component that contains the string.
6. Also, make the child React component render the a `<span>` with inline CSS that makes the color of the text red.
7. Finally, pull "World" out of the string and add it back as a JS variable by concatenating it with "Hello, " and "!".

That's it! You're now done with Step One. [Here's the commit on Github](https://github.com/cerebralix/react-redux-workshop/commit/55c6a827e8119f1b551ac4f82450fd3d32b48b4a).


## Step Two:

The important thing is to know that all the fancy JSX that you see that looks like a cross between HTML and XML is converted (or transpiled) to what you just wrote in Step One. What you write next in JSX is nothing more than a fancy way of writing plain old JavaScript.

1. Add the JSX tranformer to your index page after the two existing scripts:

	```
	<script src="https://fb.me/JSXTransformer-0.13.3.js"></script>
	```

2. Now convert your `view.js` file to `view.jsx`. This tell the JSX transformer to transpile the JSX to JavaScript at runtime.
3. Go back to your `index.html` file and update the script tag to pull the `.jsx` file now and also add the `type="text/jsx"` attribute to the `<script>` tag
4. You're now ready to write JSX!
5. Instead of writing `React.createElement` everywhere, you can now just write a function that returns JSX, and use that. Here's an example:

	```
	var Greeting = function Greeting() {
		return (
			<span>"Hello, my name is Justin."</span>
		);
	};
	```

6. Then you can import that into another component, or the `ReactDOM.render` method like so:

	```
	ReactDOM.render(
		<Greeting />,
		document.getElementById('root')
	);
	```

7. Go ahead and convert your "Hello, World!" app to this style. It's important to note that
8. Giving that should have worked for you. Let's get a little fancier. React allows the use of programmatic classes that provide more power to the tool. Let's start by converting our function to a class like so ...

	```
	var Greeting = React.createClass({
		render: function render() {
			return (
				<span>"Hello, my name is Justin."</span>
			);
		}
	});
	```

9. Nothing will need to change in your `ReactDOM.render` method, so refresh your app in the browser, and all should work!
10. Let's now add two more properties to the class. `getInitialState`, which is an official property of the class. It does exactly what it says and is part of the React lifecycle. The other is a function that captures a form submission. It should look like this:

	```
	var Greeting = React.createClass({
			getInitialState: function getInitialState() {
				// ...
			},
			setNewName: function setNewName(event) {
				// ...
			},
			render: function render() {
				return (
					<span>"Hello, my name is Justin."</span>
				);
			}
		});
	```

11. Now that we have the ability, add your initial name, "World", to the initial state by returning the string inside an object in the function.
12. `setNewName` method will capture a form `onsumbit` event, so it needs to `preventDefault`. Then, run a `this.setState()` with the new name as an argument. You can get this argument off the `event.currentTarget`, which I'll explain shortly. This method will be available off of the `this` object.
13. Finally, add the necessary JSX (basically the HTML) of the form:

	```
	<form onSubmit={this.setNewName}>
		<label for="name">Who do you want to say hi to?</label>
		<input id="name" type="text" defaultValue={this.state.name} />
		<input type="submit" />
	</form>
	```

14. Now, that `onSubmit` fires off the `setNewName` method. Notice how we are setting a default value with `this.state.name`?
15. We can now set the new name with the following bit of code in the `setNewName` method (make sure to not forget the `event.preventDefault()` call as well):
```
this.setState({ name: event.target.querySelector('#name').value });
```
16. Does it work? Keep trying and see if you can get it working. Don't forget to utilize the React documentation for the API. Don't just give up and look at the answer

That's it! You're now done with Step Two. [Here's the commit on Github](https://github.com/cerebralix/react-redux-workshop/commit/ed22006587b8b95117b49ad355b67f8a332355af).


## Step Three: Start organizing your code!

By now, you probably have a very large class that houses all of your app. Start splitting it up! Have your root class import in another React element so you start composing with components:

1. Create a new functional React component call `Form` and have it return all your form JSX:

	```
	var Form = function form(data) {
			return (
				<form onSubmit={data.submitMethod}>
					<label htmlFor="name">Who do you want to say hi to?</label>
					<input id="name" type="text" defaultValue={data.state.name} />
					<input type="submit" />
				</form>
			);
		};
	```

2. Now import that form in your root app component:

	```
	<div>
		<Form />
		<h1>Hello, {this.state.name}!</h1>
	</div>
	```

3. This isn't going to work. That's because the form component doesn't have access to the needed data and functions. Let's add that now!
4. When importing the `<Form />` component in, pass the state and form submission function like this:

	```
	<Form state={this.state} functionName={this.functionName} />
	```

Once you feel your code is organized and working, [check out how I did it here](https://github.com/cerebralix/react-redux-workshop/commit/60061265634b3382d09bccb428f2023a7cc58fb9).


## Step Four: Make your first todo app!

You now know enough to get started making your first todo app. Here are the requirements:

- A form needs to be able to accept a string and, on submit, push that string onto an array that represents the state of the app.
- When the data is pushed to the array, the new state is set with `this.setState()`, that's how the app knows to re-render. The array should look something like this:

	```
	['Learn React and Redux']
	```

- The app maps over the new array creating an unordered list of todos. The trick here is to do something like this:

	```
	<ul>
		{props.todos.map(function (todo, i) {
			return <Todo todo={todo} key={i} />;
		})}
	</ul>
	```

It may be hard, but really try to get this. If you're stuck, [check out how I do it here](https://github.com/cerebralix/react-redux-workshop/commit/ae58b9c9d8c6d12a38d56456d130508a44169f34), but don't just plain old copy and paste.


## Step Five: Introduce Redux!

Moving state out of the view is critical for separating of concerns of software development. Redux allows us to put our data in a single store, and provide that data to the view at render time.

1. Add Redux (store and data API) and React-Redux (wrapper to connect Redux to React components) to your project. Add these to your index.html:

	```
	<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.3.1/redux.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/4.4.1/react-redux.js"></script>
	```

	This provides `Redux` and `ReactRedux` to the global `window` object.

2. Now create a `store.js` file and add a script tag referencing it to your index.html as well. This, `store.js` is where we'll place all of our data related code. This script tag needs to go before your `view.jsx` script tag.

3. We now need two things:

	- Our first "reducer"
	- Our store

4. A reducer is a function that takes in a `state` object and `action` object as parameters, and, through a conditional (usually a switch statement) returns a new state according to the action type:

	```
	function myReducer(state, action) {
		switch (action.type) {
			case 'SAY_HI':
				return 'hello';
			case 'SAY_BYE':
				return 'bye bye';
			default:
				return state;
		}
	}
	```

	The reducer your going to write needs to evaluate the `action.type` for an `"ADD_TODO"` string. If so, return a NEW array with the additional todo. And, if the action is not `"ADD_TODO"`, then just return the existing state.

	**Remember, when using Redux, you can't mutate the state, you can only return new state, so don't accidentally use references.**

5. Now, create your store with this reducer, and provide an initial state array: `['Learn React and Redux']`:

	```
	window.store = Redux.createStore(todoReducer); // or, whatever you called your reducer
	```

6. Now that you have a store, and you've added it to the global `window` object, use it in your `view.js` instead of having it manage it's own state. To do this, you will modify your `getInitialState` method and have it call `store.getstate()` and modify your method you've attached to your `onSubmit` event to call `store.dispatch()` with your supplied `action` object. After calling the dispatch method, you then have to setState to the view to tell React to re-render `this.setState()` calling `store.getState()` again to supply the data. Then, ensure that you clear the input after adding the new todo.

	This is what a `store.dispatch()` should look like:

	```
	store.dispatch({ type: 'SAY_HI' });
	```

	You will also have to pass any data within the object as well, so you may have a key of 'todo' or 'title' and pass the string value along as well.

7. Now, get your app working again! Make sure you can add many todos and that the input clears itself after the submit.

Once you done, [check out how I do it here](https://github.com/cerebralix/react-redux-workshop/commit/d845315d9a6e0e69cdc4bf2cdf61b30af5262317)


## Step Six: Add more complex data structures

Data is very rarely represented as an array of string, so let's make this more challenging. Let's make it an array of objects, each object representing a todo.

1. Each todo object is going to need three properties:

	- an ID which should match the index of the array position
	- the text or title of the todo
	- whether the todo is completed or not

2. First, make a quick change to you add todo condition so that it returns an id for the newly added todo. You can just use the length property on the array.

3. Now, you need to be able to complete a todo. This requires a few things:

	- Each todo that's printed to screen needs to have a checkbox that represents whether the todo is done or not
	- A new condition within the reducer that accepts the new action of completion, and returns a new, not mutated, state
	- A new onChange event handler for the checkbox to capture the event and trigger another dispatch.

4. So, first, write your new reducer condition. This is actually challenging, and it's intentional, as I want you to feel how difficult it is to write non-mutating state functions. A hint will be split the array into pieces create your new todo object within the array and concat them all back together again. If you get stuck for too long, just look at my solution.

5. Next, add the event handler to your view for the `onChange` event associated with your `checkbox`, and do a `store.dispatch()` with your action object and then set the state on the view to trigger a re-render.

	To make this a little more usable, wrap your checkbox and text in a `label` element and use the `for` and `id` attributes to link them together.

6. Conditionally set a class on the todo's `<li>` if it's completed. So that it is styled as "completed". Be sure to grab the CSS styles below and place them in your CSS file:

	```
	body {
		margin: 2em;
	}
	input[type="text"] {
		display: block;
		margin-bottom: 1em;
	}
	input[type="checkbox"] {
		margin-right: 1em;
	}
	.completed {
		text-decoration: line-through;
		color: lightgray;
	}
	```

7. Lastly, and to help with debugging, leverage the `store.subscribe()` method like this to see your data change in real time:

	```
	store.subscribe(function logStore() {
		console.log(store.getState());
		}
	);
	```

	This method allows you to run a function on each new store change. In this instance, it just calls a function that logs to the console.

8. Check your work. Does it allow you to add todos and complete and uncomplete them?

Step Six's solution [here to check your work](https://github.com/cerebralix/react-redux-workshop/commit/c136496a98e46a3fcf937b39e90f6da1648d459c)

## Step Seven: Introduce ReactRedux

Rather than managing the two states of our app, Redux store and React's this.state, let's have something connect the two entities together for us!

So that I don't have to explain the inner workings of ReactRedux, please [watch these amazing tutorials with Dan Abromov on Egghead.io](https://egghead.io/series/getting-started-with-redux).
 
The basic components to know are:

- Provider
- connect
- mapping state to props
- mapping dispatch to props
 
1. Ensure that you're pulling in ReactRedux via the `<script>` tag on the index.html page.

2. What we want to do is pull state and event related functions out of our view and delegate that to our ReactRedux library.

3. Within you main jsx file, pull your state related functions out and place them in a function called "mapStateToProps". This is what it should look like:

	```
	function mapStateToProps(state) {
		return { /* your state object */ };
	}
	```

4. Now, pull you event listener functions out of your React component and place them in a function called "mapDispatchToProps". Like this:

	```
	function mapDispatchToProps(dispatch) {
		return { /* your event methods object */ };
	}
	```
	
5. Using ReactRedux, call the `connect` method passing in the two map functions as arguments. Then, using partial application, call it again, but now with your root React component as the only argument, making sure your save what it returns to a variable:

	```
	var ConnectedApp = ReactRedux.connect(
			mapStateToProps,
			mapDispatchToProps
		)(/* Root React Component */);
	```
	
6. The above returns a connected app that will now listen for state changes for you, so there's no longer a need for the React.createClass and the `this.setState` or `getInitialState` methods. Let's now write our React components as stateless, pure functions.

7. Finally, wrap your new `ConnectedApp` component with `ReactRedux.Provider` and pass the Redux store you created earlier into a attribute called store:
 
	```
	ReactDOM.render(
		<ReactRedux.Provider store={ /* Your Redux store reference */ }>
			<ConnectedApp />
		</ReactRedux.Provider>,
		document.getElementById('root)
	);
	```

8. Clean up your code and see test. Remember, we want all our React views to be stateless, pure functions. Let the libraries do the work for us.

## Step Eight: Let's organize our application better.

How can we break this up into functional pieces? What about the classic MVC? Or, how about components, containers and store? Or ... how would you split these into different files? This is a do-your-own-thing exercise.

## Step Nine: Add TypeScript

Let's add TypeScript to give us a better development environment! First things first:

1. Install the needed things: TypeScript and Webpack. The former will transpile our code, among other things, and the latter will build our bundle for the browser.

	```
	npm install typescript webpack --save-dev
	```
	
2. Now that we have TypeScript, we'll need the type definitions for our libraries. To do this, the best way is to do a `git clone` on [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). After this installs, you'll have almost every major libary and framework definition you'll ever need :)

3. Copy and paste the following directories to a directory called `typings` or `definitions` in your project from the DefinitelyTyped project:
 
 	- react
 	- react-redux
 	- redux
 	
4. You'll now need a way to reference this definitions. So, at the root of your application, create a new file called `typings.d.ts` or whatever, and reference each library definition with the appropriate syntax:

	```
	/// <reference path="react.d.ts" />
	/// <reference path="react-dom.d.ts" />
	/* So on and so forth */
	```
 	
5. Now install the libraries:

	```
	npm install react react-dom react-redux redux --save
	```
	
6. You can now switch all your files to `.ts` or `.tsx` extensions (similar to `.js` or `.jsx`) and ES6 modules. Don't change too much of your code, but just embrace the new module definition. A part of this will be removing all the references to the global window object for your library methods. You'll get them by pulling them in now.

7. Delete all the `<script>` tags in your `index.html` except one, and call that `bundle.js`.

8. After you've switched them all over and removed the unneeded script tags, you are almost ready to do the first step in your build. Create a `tsconfig.json` file for your TypeScript configuration:
 
	```
	{
		"compilerOptions": {
			"target": "es5",
			"module": "commonjs",
			"moduleResolution": "node",
			"jsx": "react",
			"noImplicitAny": false,
			"sourceMap": true
		},
		"exclude": [
			"node_modules",
			"typings"
		]
	}
	```

9. Now you need an NPM command to run it. In your `package.json` add a script to run called "transpile":

	```
	"scripts": {
		"transpile": "tsc"
	}
	```
	
10. Type `npm run transpile` in your terminal. This should build your files without error. If you get an error, ask you instructor for help. Or, use the Googles :)

11. Last but not least, we need to bundle our files into something the browser can execute. So, add another script to the `package.json` to run a bundle method using Webpack:

	```
	"scripts": {
		"transpile": "tsc"
		"bundle": "webpack ./app.tsx bundle.js"
	}
	```
	
12. Run `npm run bundle` in your terminal. This should produce a single file called `bundle.js`.

13. Refresh your app in your browser and everything *should* work :)

NOTE: You'll probably want to ignore all the built files with `.gitignore`.

## Step Ten: Let's organize again

Let's organize and atomize our app's components. This will help prevent our root directory from exploding with files. Here's the naming of our directories:

- views
- initiators
- store
- reducers
- styles

## Step Eleven: Defining an interface

Now that we have TypeScript, let's use one of its most powerful features: interfaces and typings.

1. Let's define what the interface is for our state and actions, and what our reducer returns within our store.js file. If you are unfamiliar with how to do this, reference the TypeScript docs, but here's a shell you can start with:

	```
	interface Todo {
		/* describe the shape of your todo item */
	}
	interface State {
		/* describe the shape of your todo item */
	}
	interface Actions {
		/* describe the possible shape of actions */
		/* this will likely have optional params since it should describe all possible actions */
		example?: string; // the question mark denotes optional
	}
	```

2. Now, within your reducer function, assign the correct types to the function parameters, using the colon syntax, and for the return object:

	```
	function myFunc(paramOne: InterfaceOne, paramTwo: InterfaceTwo): InterfaceForReturn {};
	```
	
3. If you haven't already done it, make sure your actual state object looks like this: `{ todos: [] }`. If it's just returning an array, change this now. Don't forget to update your `mapStateToProps` method if you changed the store.

4. You are more than likely going to encounter errors from TypeScript, you have to really think about what the errors are telling you. Most likely, it's when TypeScript tries to infer a type, and get's it wrong. Array.concat() is going to be one of those. So, make sure to pass in similar types into `concat` and not mixed types.

## Step Twelve: Let's decouple events from our view

We want our views to be as simple as possible. With the sole responsibility of rendering to the page with given data. 

1. Our next step in doing this is pulling the event methods out of the app.tsx, and into a separate module called `client-events.ts`.
2. Now, rather than continuously pass ... coming soon ...

