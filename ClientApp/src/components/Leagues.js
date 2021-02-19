import React, { Component } from 'react';
import { ErrorPage } from './ErrorPage';
import { Spinner, Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";

export const displayName = "Leagues";

export class Leagues extends Component {

    constructor(props) {
        super(props);
        this.state = { leagues: [], leaguesLoading: true };
    }

    componentDidMount() {
        this.populateLeaguesData();
    }

    renderLeaguesTable() {
        return (
            <Container>
                <Row>
                    {this.state.leagues.map(leagueData =>

                        <Col key={leagueData.leagueId} className="table-div leagues" xs="3">
                            <Link to={`/countries/${this.props.match.params.countryName}/${leagueData.leagueId}/${leagueData.seasonYear}`}>
                                <div className="league-flag">
                                    <img alt="" src={leagueData.leagueLogo} />
                                </div>
                                <div className="football-normal-text">{leagueData.leagueName}</div>
                            </Link>
                        </Col>
                    )}
                </Row>
            </Container>
        );
    }

    render() {
        if (this.state.leaguesLoading) {
            return <div className="spinner"><Spinner color="primary" /></div>
        }

        if (!this.state.leagues) {
            return <ErrorPage />;
        }

        return (
            <div>
                <div className="football-nav">
                    <Link to="/countries"><div className="football-nav-link">Countries</div></Link>
                    <div className="football-nav-link separator">&gt;</div>
                    <div className="football-nav-link">{this.props.match.params.countryName}</div>
                </div>
                {this.renderLeaguesTable()}
            </div>
        );
    }


    async populateLeaguesData() {
        const countryName = this.props.match.params.countryName;
        const response = await fetch(`/api/Leagues/${countryName}`);
        const data = await response.json();
        this.setState({ leagues: data, leaguesLoading: false });
    }
}