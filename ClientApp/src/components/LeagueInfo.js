import React, { Component } from 'react';
import { ErrorPage } from './ErrorPage';
import { withRouter } from "react-router";
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, Spinner, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import classnames from 'classnames';

//export const displayName = "LeagueInfo";

export class LeagueInfoComponent extends Component {
    seasonYears = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

    initialState = {
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
        teamName: ""
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.toggleSummary = this.toggleSummary.bind(this);
        this.toggleResults = this.toggleResults.bind(this);
        this.toggleTeamInfo = this.toggleTeamInfo.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.changeYear = this.changeYear.bind(this);
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

    changeYear(countryName, leagueId, year) {
        this.props.history.push(`/countries/${countryName}/${leagueId}/${year}`);
    }

    componentDidMount() {
        this.populateLeagueStandings();
        this.populateLeagueTopScorers();
    }

    componentDidUpdate(prevProps) {
        if (this.props.seasonYear !== prevProps.seasonYear) {
            this.setState({ ...this.initialState });
            this.populateLeagueStandings();
            this.populateLeagueTopScorers();
        }
    }

    renderLeagueInfoTable() {
        
        return (
            <Container>
                {this.state.leagueStandings.response.map(leagueData =>

                    <Row key={leagueData.league.id}>

                        <div className="football-league-main-logo">
                            <ListGroup horizontal>
                                <ListGroupItem className="d-flex align-items-center" key={leagueData.league.name}>
                                    <div>
                                        <img alt="" src={leagueData.league.logo} />
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
                            <select id="seasonValue" onChange={event => this.changeYear(this.props.countryName, this.props.leagueId, event.target.value)} value={this.props.seasonYear}>
                                {this.seasonYears.map(year => {
                                    if (year === this.props.seasonYear) {
                                        return (<option key={year} disabled={true} value={year}>{year}</option>)
                                    }
                                    else { return <option key={year} value={year}> {year}</option> }
                                }
                                )}
                            </select>
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

                                        {(this.state.leagueTopScorers.response === undefined || this.state.leagueTopScorers.response.length == 0) ?

                                            null :

                                            <NavItem> { /* ToggleSummary 2*/}
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTabSummary === '2' })}
                                                    onClick={() => { this.toggleSummary('2', this.populateLeagueTopScorers()); }}
                                                > Top Scorers
                                                </NavLink>
                                            </NavItem>
                                        }
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

                        <div key={leagueData.league.id}>

                            {leagueData.league.standings.map((standings, index) =>

                                <div key={index}>

                                    {standings.map(teamStats =>

                                        <Row key={teamStats.rank}>

                                            <Col>
                                                {teamStats.rank}
                                            </Col>
                                            <Col>
                                                <img className="img_temp float_fixture" alt="" src={teamStats.team.logo} />
                                                <p onClick={() => this.toggleTeamInfo(leagueData.league.id, leagueData.league.season, teamStats.team)}>{teamStats.team.name}</p>
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
                                    )}
                                </div>
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
                {(this.state.leagueTopScorers.response === undefined || this.state.leagueTopScorers.response.length == 0) ?

                    <div>NO DATA</div>

                    : this.state.leagueTopScorers.response.map((leagueData, index) =>

                        <div key={leagueData.player.name}>

                            {leagueData.statistics.map(stats =>
                                <Row>
                                    <Col>
                                        {index + 1}
                                    </Col>
                                    <Col>
                                        {leagueData.player.name}
                                    </Col>
                                    <Col>
                                        {stats.team.logo}
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

                        <div key={leagueData.round}>

                            <div className="teamSquad">{leagueData.round}</div>

                            {leagueData.data.map((match, index) =>
                                <Row key={index}>
                                    <Col>
                                        {match.date}
                                    </Col>
                                    <Col>
                                        <div className="float_fixture">{match.teams.home.name}</div>
                                        <div className="img_temp float_fixture"><img alt="" src={match.teams.home.logo} /></div>
                                    </Col>
                                    <Col>
                                        <b>{match.goals.home} - {match.goals.away}</b>
                                    </Col>
                                    <Col>
                                        <div className="img_temp float_fixture"><img alt="" src={match.teams.away.logo} /></div>
                                        <div className="float_fixture">{match.teams.away.name}</div>
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
        return (
            <Container>
                {
                    this.state.leagueTeamSquad.map(teamData =>

                        <div key={teamData.position}>

                            <div className="teamSquad">{teamData.position}</div>

                            {teamData.data.map(player =>
                                <Row key={player.name}>
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
                    <div className="football-nav-link">{this.props.countryName}</div>
                </div>
                {this.renderLeagueInfoTable()}
            </div>
        );
    }


    async populateLeagueStandings() {
        const leagueId = this.props.leagueId;
        const seasonYear = this.props.seasonYear;
        const response = await fetch(`/api/League/standings/${leagueId}/${seasonYear}`);
        const data = await response.json();
        this.setState({ leagueStandings: data, loadingStandings: false });
    }

    async populateLeagueTopScorers() {
        const leagueId = this.props.leagueId;
        const seasonYear = this.props.seasonYear;
        const response = await fetch(`/api/League/top-scorers/${leagueId}/${seasonYear}`);
        const data = await response.json();
        this.setState({ leagueTopScorers: data, loadingTopScorers: false });
    }

    async populateLeagueFixtures() {
        const leagueId = this.props.leagueId;
        const seasonYear = this.props.seasonYear;
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

export const LeagueInfo = withRouter(LeagueInfoComponent);