import React, { Component } from 'react';
import { ErrorPage } from './ErrorPage';
import { withRouter } from "react-router";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Spinner, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import classnames from 'classnames';

export const displayName = "LeagueInfo";

export class LeagueInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { leagueStandings: [], leagueTopScorers: [], loadingTopScorers: true, loadingStandings: true, activeTab: '1' };
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    componentDidMount() {
        this.populateLeagueStandings().then(() => {
            this.populateLeagueTopScorers();
        });
    }

    renderLeagueInfoTable() {
        return (
            <Container>
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}>
                                Standings
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            > Top Scorers
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            {this.state.activeTab == '1'
                                ? <div>{this.renderLeagueStandings()}</div>
                                : null}
                        </TabPane>
                        <TabPane tabId="2">
                            {this.state.activeTab == '2' && (this.state.loadingTopScorers
                                ? <div className="spinner"><Spinner color="primary" /></div>
                                : <div>{this.renderLeagueTopScorers()}</div>)}
                        </TabPane>
                    </TabContent>
                </div>
            </Container>
        );
    }

    renderLeagueStandings() {
        return (
            <Container>
                {
                    this.state.leagueStandings.response.map(leagueData =>
                        <div>
                            <Row>
                                <div className="football-league-main-logo">
                                    <ListGroup horizontal>
                                        <ListGroupItem className="d-flex align-items-center" key={leagueData.league.name}>
                                            <div>
                                                <img src={leagueData.league.logo} />
                                            </div>
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                                <div className="football-league-main-text">
                                    <p>{leagueData.league.name}</p>
                                    <p>{leagueData.league.season}</p>
                                </div>
                            </Row>

                            {leagueData.league.standings.map(standings =>
                                standings.map(teamStats =>
                                    <Row>
                                        <Col>
                                            {teamStats.rank}
                                        </Col>
                                        <Col>
                                            <Link to={`/countries/${this.props.match.params.leagueId}/${leagueData.league.name}`}>{teamStats.team.name}</Link>
                                        </Col>
                                        <Col>
                                            {teamStats.all.played}
                                        </Col>
                                        <Col>
                                            {teamStats.all.win}
                                        </Col>
                                        <Col>
                                            {teamStats.all.draw}
                                        </Col>
                                        <Col>
                                            {teamStats.all.lose}
                                        </Col>
                                        <Col>
                                            {teamStats.all.goals.for}:{teamStats.all.goals.against}
                                        </Col>

                                    </Row>
                                )
                            )}
                        </div>
                    )
                }
            </Container>
        )
    }

    renderLeagueTopScorers() {
        return (
            <Container>
                {
                    this.state.leagueTopScorers.response.map((leagueData, index) =>
                        <div>
                            {leagueData.statistics.map(stats =>
                                <Row>
                                    <Col>
                                        {index + 1}
                                    </Col>
                                    <Col>
                                        {leagueData.player.name}
                                    </Col>
                                    <Col>
                                        {stats.team.name}
                                    </Col>
                                    <Col>
                                        {stats.goals.total}
                                    </Col>
                                    <Col>
                                        {stats.goals.assists}
                                    </Col>
                                </Row>
                            )}
                        </div>
                    )
                }
            </Container>
        )
    }

    render() {
        if (this.state.loadingStandings) {
            return <div className="spinner"><Spinner color="primary" /></div>
        }

        if (!this.state.leagueStandings) {
            return <ErrorPage />;
        }

        return (
            <div>
                <div className="football-nav">
                    <Link to="/countries"><div className="football-nav-link">Countries</div></Link>
                    <div className="football-nav-link separator">&gt;</div>
                    <div className="football-nav-link">{this.props.match.params.countryName}</div>
                </div>
                {this.renderLeagueInfoTable()}
            </div>
        );
    }


    async populateLeagueStandings() {
        const leagueId = this.props.match.params.leagueId;
        const response = await fetch(`/api/League/${leagueId}`);
        const data = await response.json();
        this.setState({ leagueStandings: data, loadingStandings: false });
    }

    async populateLeagueTopScorers() {
        let leagueId, leagueSeason;
        {
            this.state.leagueStandings.response.map(leagueData => {
                leagueId = leagueData.league.id;
                leagueSeason = leagueData.league.season;
            })
        }
        const response = await fetch(`/api/League/${leagueId}/${leagueSeason}`);
        const data = await response.json();
        this.setState({ leagueTopScorers: data, loadingTopScorers: false });
    }
}