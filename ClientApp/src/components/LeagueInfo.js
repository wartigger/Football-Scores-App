import React, { Component } from 'react';
import { ErrorPage } from './ErrorPage';
import { withRouter } from "react-router";
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, Spinner, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import classnames from 'classnames';

export const displayName = "LeagueInfo";

export class LeagueInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leagueStandings: [],
            leagueTopScorers: [],
            leagueFixtures: [],
            loadingStandings: true,
            loadingTopScorers: true,
            loadingFixtures: true,
            activeTabSummary: '1',
            activeTabResults: '1',
            modal: false,
            teamId: null
        };
        this.toggleSummary = this.toggleSummary.bind(this);
        this.toggleResults = this.toggleResults.bind(this);
        this.toggleTeamInfo = this.toggleTeamInfo.bind(this);
    }

    toggleSummary(tab) {
        if (this.state.activeTabSummary !== tab) {
            this.setState({ activeTabSummary: tab });
        }
    }

    toggleResults(tab) {
        if (this.state.activeTabResults !== tab) {
            this.setState({ activeTabResults: tab });
        }
    }

    toggleTeamInfo(id) {
        this.setState({
            modal: !this.state.modal,
            teamId: id
        });
    }

    componentDidMount() {
        this.populateLeagueStandings().then(() => {
            this.populateLeagueTopScorers();
            this.populateLeagueFixtures();
        });
    }

    renderLeagueInfoTable() {
        return (
            <Container>
                {this.state.leagueStandings.response.map(leagueData =>
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
                )}


                {/* */}
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTabResults === '1' })}
                                onClick={() => { this.toggleResults('1'); }}>
                                Summary
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTabResults === '2' })}
                                onClick={() => { this.toggleResults('2'); }}
                            > Results
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <br /><br />
                    <TabContent activeTab={this.state.activeTabResults}>
                        <TabPane tabId="1">
                            {this.state.activeTabResults == '1'
                                ? <div>
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTabSummary === '1' })}
                                                onClick={() => { this.toggleSummary('1'); }}
                                            > Standings
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTabSummary === '2' })}
                                                onClick={() => { this.toggleSummary('2'); }}
                                            > Top Scorers
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={this.state.activeTabSummary}>
                                        <TabPane tabId="1">
                                            {this.state.activeTabSummary == '1'
                                                ? <div>{this.renderLeagueStandings()}</div>
                                                : null}
                                        </TabPane>
                                        <TabPane tabId="2">
                                            {this.state.activeTabSummary == '2' && (this.state.loadingTopScorers
                                                ? <div className="spinner"><Spinner color="primary" /></div>
                                                : <div>{this.renderLeagueTopScorers()}</div>)}
                                        </TabPane>
                                    </TabContent>
                                </div>
                                : null}
                        </TabPane>

                        <TabPane tabId="2">
                            {this.state.activeTabResults == '2' && (this.state.loadingFixtures
                                ? <div className="spinner"><Spinner color="primary" /></div>
                                : <div>{this.renderLeagueFixtures()}</div>)}
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
                            {leagueData.league.standings.map(standings =>
                                standings.map(teamStats =>
                                    <Row>
                                        <Col>
                                            {teamStats.rank}
                                        </Col>
                                        <Col>
                                            <Link onClick={this.toggleTeamInfo()} >{teamStats.team.name}</Link>
                                            <Modal isOpen={this.state.modal} toggle={this.toggleTeamInfo}>
                                                <ModalHeader toggle={this.toggleTeamInfo}>
                                                    LEAGUE TITLE
                                                </ModalHeader>
                                                <ModalBody>
                                                    LEAGUE DETAILS
                                                </ModalBody>
                                            </Modal>
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

    renderLeagueFixtures() {
        return (
            <Container>
                {
                    this.state.leagueFixtures.map(leagueData =>
                        <div>
                            <div>{leagueData.round}</div>
                            {leagueData.data.map(match =>
                                <Row>
                                    <Col>
                                        {match.date}
                                    </Col>
                                    <Col>
                                        <div class="float_fixture">{match.teams.home.name}</div>
                                        <div className="img_temp float_fixture"><img src={match.teams.home.logo} /></div>
                                    </Col>
                                    <Col>
                                        <b>{match.goals.home} - {match.goals.away}</b>
                                    </Col>
                                    <Col>
                                        <div className="img_temp float_fixture"><img src={match.teams.away.logo} /></div>
                                        <div class="float_fixture">{match.teams.away.name}</div>
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
        const response = await fetch(`/api/League/summary/${leagueId}`);
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
        const response = await fetch(`/api/League/summary/${leagueId}/${leagueSeason}`);
        const data = await response.json();
        this.setState({ leagueTopScorers: data, loadingTopScorers: false });
    }

    async populateLeagueFixtures() {
        let leagueId, leagueSeason;
        {
            this.state.leagueStandings.response.map(leagueData => {
                leagueId = leagueData.league.id;
                leagueSeason = leagueData.league.season;
            })
        }
        const response = await fetch(`/api/League/fixtures/${leagueId}/${leagueSeason}`);
        const data = await response.json();
        this.setState({ leagueFixtures: data, loadingFixtures: false });
    }
}