import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import BlogDashboardPage from '../components/BlogDashboardPage';
import EditBlogPage from '../components/EditBlogPage';
import NotFoundPage from '../components/NotFoundPage';
import SettingsPage from '../components/SettingsPage';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={BlogDashboardPage} exact={true} />
                <PrivateRoute path="/edit/:id" component={EditBlogPage} />
                <PrivateRoute path="/settings" component={SettingsPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;