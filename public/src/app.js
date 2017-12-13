import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import AppRouter , { history } from './routers/AppRouter';
import configureStore from './stores/configureStore';
import expensesReducer from './reducers/expenses';
import { startSetExpenses }from './actions/expenses';
import { login , logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from  './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};


ReactDOM.render(<LoadingPage />, document.getElementById('app'));



firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            history.push('/');
         });
        console.log('log in. UID:', user.uid );
    } else {
        store.dispatch(logout());
        console.log('log out');
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            history.push('/');
         });
    }
});
