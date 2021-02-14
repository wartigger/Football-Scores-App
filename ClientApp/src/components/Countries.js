import React, { Component } from 'react';

export const displayName = "Countries";

export class Countries extends Component {

    constructor(props) {
        super(props);
        this.state = { countries: [], loading: true };
    }

    componentDidMount() {
        this.populateCountriesData();
    }

    static renderCountriesTable(countries) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Country Code</th>
                        <th>Flag</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map(country =>
                        <tr key={country.name}>
                            <button onClick={() => { this.sendCountryName(country.name) }}>{country.name}</button>
                            <td>{country.code}</td>
                            <td><img className="country-flag" src={country.flag}/></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Load...</em></p>
            : Countries.renderCountriesTable(this.state.countries, this.state.leagues);

        return (
            <div>
                <h1 id="tabelLabel">Countries</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateCountriesData() {
        const response = await fetch('api/Football');
        const data = await response.json();
        this.setState({ countries: data, loading: false });
    }

    static async sendCountryName(countryName) {
        return await fetch(`/api/Leagues/${countryName}`);
    }

    // const data = response.json();
    // this.setState({ leagues: data, loading: false });
}
