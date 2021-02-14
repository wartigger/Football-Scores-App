import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Countries } from './components/Countries';
import { Leagues } from './components/Leagues';
import { ErrorPage } from './components/ErrorPage';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/countries' component={Countries} />
                    <Route path='/leagues' component={Leagues} />
                    <Route path='*' component={ErrorPage} />
                </Switch>
            </Layout>
        );
    }
}
