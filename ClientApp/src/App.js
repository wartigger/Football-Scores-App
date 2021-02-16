import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Countries } from './components/Countries';
import { Leagues } from './components/Leagues';
import { ErrorPage } from './components/ErrorPage';
import { LeagueInfo } from './components/LeagueInfo';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/countries' component={Countries} />
                    <Route exact path='/countries/:countryName' component={Leagues} />
                    <Route path='/countries/:countryName/:leagueId' component={LeagueInfo} />
                    <Route path='*' component={ErrorPage} />
                </Switch>
            </Layout>
        );
    }
}
