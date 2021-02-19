import React, { Component } from 'react';
import { ErrorPage } from './ErrorPage';
import { withRouter } from "react-router";
import { Spinner, ListGroup, ListGroupItem, Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";

export const displayName = "Leagues";

export class Leagues extends Component {

    constructor(props) {
        super(props);
        this.state = { leagues: [], loading: true };
    }

    componentDidMount() {
        this.populateLeaguesData();
    }

    renderLeaguesTable(/*leagues, url*/) {
        return (
            <Container>
                <Row>
                    {this.state.leagues.map(leagueData =>
                        <Col className="table-div" xs="3">
                            <Link to={`/countries/${this.props.match.params.countryName}/${leagueData.leagueId}/${leagueData.seasonYear}`}>
                                <ListGroup horizontal className="list-group-items">
                                    <ListGroupItem className="d-flex align-items-center" key={leagueData.leagueName} tag="a" href="">
                                        <div className="league-flag">
                                            <img src={leagueData.leagueLogo} />
                                        </div>
                                        <div className="football-normal-text">{leagueData.leagueName}</div>
                                    </ListGroupItem>
                                </ListGroup>
                            </Link>
                        </Col>
                    )}
                </Row>
            </Container>
        );
    }

    render() {
        if (this.state.loading) {
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
                {this.renderLeaguesTable(/*this.state.leagues, this.props.match.params.countryName*/)}
            </div>
        );
    }


    async populateLeaguesData() {
        const countryName = this.props.match.params.countryName;
        const response = await fetch(`/api/Leagues/${countryName}`);
        const data = await response.json();
        this.setState({ leagues: data, loading: false });
    }
}