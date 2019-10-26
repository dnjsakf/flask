// Config React-init
import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import App from './components/App/App'

// import './common.css'

// Config Redux
// import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import rootReducer from './reducers'

// Config ReduxSaga
// import createSagaMiddleware from 'redux-saga'
// import rootSagas from './sagas'

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore( rootReducer, applyMiddleware(sagaMiddleware) );

function render( Component, flag=false ){
	Component = flag ? hot( Component ) : Component;
	ReactDOM.render( 
		// <Provider store={ store }>
			<Component user='Heo'/>
		// </Provider>
	, document.getElementById('root') );
}

// sagaMiddleware.run(rootSagas);
render( App, true );