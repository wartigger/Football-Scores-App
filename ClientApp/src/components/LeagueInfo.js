import React, { Component } from 'react';
import { ErrorPage } from './ErrorPage';
//import { withRouter } from "react-router";
import { Form, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, Spinner, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
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
            leagueTeamSquad: [],
            loadingStandings: true,
            loadingTopScorers: true,
            loadingFixtures: true,
            loadingTeamSquad: true,
            activeTabSummary: '1',
            activeTabResults: '1',
            modal: false,
            leagueId: null,
            season: null,
            teamId: null,
            teamName: "",
            dropdownOpen: false,

        };
        this.toggleSummary = this.toggleSummary.bind(this);
        this.toggleResults = this.toggleResults.bind(this);
        this.toggleTeamInfo = this.toggleTeamInfo.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        //this.renderLeagueTeamSquad = this.renderLeagueTeamSquad.bind(this);
        //this.renderLeagueFixtures = this.renderLeagueFixtures.bind(this);
        //this.renderLeagueTopScorers = this.renderLeagueTopScorers.bind(this);
        //this.renderLeagueStandings = this.renderLeagueStandings.bind(this);
        //this.renderLeagueInfoTable = this.renderLeagueInfoTable.bind(this);
    }

    toggleDropdown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleSummary(tab, populateLeagueTopScorers) {
        if (!this.state.leagueTopScorers) {
            populateLeagueTopScorers();
        }
        
        if (this.state.activeTabSummary !== tab) {
            this.setState({
                activeTabSummary: tab
            });
        }
    }

    toggleResults(tab, populateLeagueFixtures) {
        if (!this.state.leagueFixtures) {
            populateLeagueFixtures();
        }

        if (this.state.activeTabResults !== tab) {
            this.setState({ activeTabResults: tab });
        }
    }

    toggleTeamInfo(_leagueId, _season, team) { 
        if (!this.state.modal) {
            this.populateLeagueTeamSquad(_leagueId, _season, team.id);
            this.setState({
                modal: !this.state.modal,
                leagueId: _leagueId,
                season: _season,
                teamId: team.id,
                teamName: team.name
            });
        }
        else {
            this.setState({
                modal: !this.state.modal
            });
        }
    }

    componentDidMount() {
        this.populateLeagueStandings();
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
                                onClick={() => { this.toggleResults('2', this.populateLeagueFixtures()); }}
                            > Results
                            </NavLink>
                        </NavItem>

                        <NavItem>

                            <FormGroup>
                                <Link to={`/countries/${this.props.match.params.countryName}/${this.props.match.params.leagueId}/${2010}`}>{this.props.match.params.seasonYear}</Link>
                                <Label for="exampleSelect">Select</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>2011</option>
                                    <option>2012</option>
                                    <option>2013</option>
                                    <option>2014</option>
                                    <option>2015</option>
                                    <option>2016</option>
                                    <option>2017</option>
                                    <option>2018</option>
                                    <option>2019</option>
                                    <option>2020</option>
                                </Input>
                            </FormGroup>

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
                                        </NavItem> { /* ToggleSummary 1*/}

                                        <NavItem> { /* ToggleSummary 2*/}
                                            <NavLink
                                                className={classnames({ active: this.state.activeTabSummary === '2' })}
                                                onClick={() => { this.toggleSummary('2', this.populateLeagueTopScorers()); }}
                                            > Top Scorers
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent activeTab={this.state.activeTabSummary}>
                                        <TabPane tabId="1">
                                            {this.state.activeTabSummary == '1'
                                                ? <div>{this.renderLeagueStandings()}</div>
                                                : null}
                                        </TabPane> { /* TabId 1*/}

                                        <TabPane tabId="2"> { /* TabId 2*/}
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
                                            <Link onClick={() => this.toggleTeamInfo(leagueData.league.id, leagueData.league.season, teamStats.team)}>{teamStats.team.name}</Link>
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

                <Modal isOpen={this.state.modal} toggle={this.toggleTeamInfo}>
                    <ModalHeader toggle={this.toggleTeamInfo}>{this.state.teamName}</ModalHeader>
                    <ModalBody>
                        {(this.state.loadingTeamSquad
                            ? <div className="spinner"><Spinner color="primary" /></div>
                            : <div>{this.renderLeagueTeamSquad()}</div>)}
                    </ModalBody>
                </Modal> 
                
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

    renderLeagueTeamSquad() {
        console.log(this.state)
        return (
            <Container>
                {
                    this.state.leagueTeamSquad.map(teamData =>
                        <div>
                            <div className="fixtures">{teamData.position}</div>
                            {teamData.data.map(player =>
                                <Row>
                                    <Col>
                                        {player.name}
                                    </Col>
                                    <Col>
                                        {player.age}
                                    </Col>
                                    <Col>
                                        {player.appearences}
                                    </Col>
                                    <Col>
                                        {player.goals}
                                    </Col>
                                    <Col>
                                        {player.yellow}
                                    </Col>
                                    <Col>
                                        {player.red}
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
        const seasonYear = this.props.match.params.seasonYear;
        const response = await fetch(`/api/League/standings/${leagueId}/${seasonYear}`);
        const data = await response.json();
        this.setState({ leagueStandings: data, loadingStandings: false });
    }

    async populateLeagueTopScorers() {
        const leagueId = this.props.match.params.leagueId;
        const seasonYear = this.props.match.params.seasonYear;
        const response = await fetch(`/api/League/top-scorers/${leagueId}/${seasonYear}`);
        const data = await response.json();
        this.setState({ leagueTopScorers: data, loadingTopScorers: false });
    }

    async populateLeagueFixtures() {
        const leagueId = this.props.match.params.leagueId;
        const seasonYear = this.props.match.params.seasonYear;
        const response = await fetch(`/api/League/fixtures/${leagueId}/${seasonYear}`);
        const data = await response.json();
        this.setState({ leagueFixtures: data, loadingFixtures: false });
    }

    async populateLeagueTeamSquad(leagueId, season, teamId) {
        const response = await fetch(`/api/League/squad/${leagueId}/${season}/${teamId}`);
        const data = await response.json();
        this.setState({ leagueTeamSquad: data, loadingTeamSquad: false });
    }
}