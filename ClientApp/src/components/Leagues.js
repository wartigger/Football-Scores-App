import React, { Component } from 'react';

export const displayName = "Leagues";

export class Leagues extends Component {

    constructor(props) {
        super(props);
        this.state = { leagues: [], loading: true };
    }

    componentDidMount() {
        this.populateLeaguesData();
    }

    static renderLeaguesTable(leagues) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>League</th>
                        <th>Flag</th>
                    </tr>
                </thead>
                <tbody>
                    {leagues.map(leagueData =>
                        leagueData.map(league =>
                            <tr key={league.name}>
                                <button /*onClick={() => { this.sendCountryName(country.name) }}*/>{league.name}</button>
                                <td><img className="country-flag" src={league.flag} /></td>
                            </tr>
                            )
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Load...</em></p>
            : Leagues.renderLeaguesTable(this.state.leagues, this.state.leagues);

        return (
            <div>
                <h1 id="tabelLabel">Leagues</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }


    async populateLeaguesData() {
        const response = await fetch('api/Leagues');
        const data = await response.json();
        this.setState({ leagues: data, loading: false });
    }
}