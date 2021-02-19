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
                    <Route
                        path='/countries/:countryName/:leagueId/:seasonYear'
                        //component={LeagueInfo}
                        render={routeProps => <LeagueInfo
                            leagueId={routeProps.match.params.leagueId}
                            seasonYear={routeProps.match.params.seasonYear}
                            countryName={routeProps.match.params.countryName}
                         />}
                    />
                    <Route path='*' component={ErrorPage} />
                </Switch>
            </Layout>
        );
    }
}
