import React, { Component } from 'react';
import { ErrorPage } from './ErrorPage';
import { withRouter } from "react-router";
import { Spinner, ListGroup, ListGroupItem, Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";

export const displayName = "LeagueInfo";

export class LeagueInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { leagueInfo: [], loading: true };
    }

    componentDidMount() {
        this.populateLeagueInfoData();
    }

    static renderLeagueInfoTable(leagueInfo, url) {
        return (
            <Container>
                {leagueInfo.response.map(leagueData =>
                    <Row>
                        <Col className="table-div" xs="3">
                            <Link to={`/countries/${url}/${leagueData.league.name}`}>
                                <ListGroup horizontal>
                                    <ListGroupItem className="d-flex align-items-center" key={leagueData.league.name} tag="a" href="">
                                        <div className="league-flag">
                                            <img src={leagueData.league.logo} />
                                        </div>
                                        <div className="football-normal-text">
                                            <p>{leagueData.league.name}</p>
                                            <p>{leagueData.league.season}</p>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </Link>
                        </Col>

                        leagueData.standings.map(standings => 
                        
                        )

                    </Row>

                    //leagueData.standings.map(standings => )
                    //<Row>
                    //    <Col className="table-div" xs="3">
                    //        <Link to={`/countries/${url}/${leagueData.league.name}`}>
                    //            <ListGroup horizontal>
                    //                <ListGroupItem className="d-flex align-items-center" key={leagueData.league.name} tag="a" href="">
                    //                    <div className="league-flag">
                    //                        <img src={leagueData.league.logo} />
                    //                    </div>
                    //                    <div className="football-normal-text">
                    //                        <p>{leagueData.league.name}</p>
                    //                        <p>{leagueData.league.season}</p>
                    //                    </div>
                    //                </ListGroupItem>
                    //            </ListGroup>
                    //        </Link>
                    //    </Col>
                    //</Row>

                )}
            </Container>
        );
    }

    render() {
        if (this.state.loading) {
            return <div className="spinner"><Spinner color="primary" /></div>
        }

        if (!this.state.leagueInfo) {
            return <ErrorPage />;
        }

        return (
            <div>
                <div className="football-nav">
                    <Link to="/countries"><div className="football-nav-link">Countries</div></Link>
                    <div className="football-nav-link separator">&gt;</div>
                    <div className="football-nav-link">{this.props.match.params.countryName}</div>
                </div>
                {LeagueInfo.renderLeagueInfoTable(this.state.leagueInfo, this.props.match.params.countryName)}
            </div>
        );
    }


    async populateLeagueInfoData() {
        const leagueId = "39";
        //const leagueId = this.props.match.params.leagueId;
        const response = await fetch(`/api/League/${leagueId}`);
        const data = await response.json();
        this.setState({ leagueInfo: data, loading: false });
    }
}