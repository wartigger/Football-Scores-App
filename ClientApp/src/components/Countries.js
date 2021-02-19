import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Spinner, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import { ErrorPage } from './ErrorPage';

export const displayName = "Countries";

export class Countries extends Component {

    constructor(props) {
        super(props);
        this.state = { countries: [], countriesLoading: true };
    }

    componentDidMount() {
        this.populateCountriesData();
    }

    renderCountriesTable() {
        return (
            <Container>
                <Row>
                    {this.state.countries.map(country =>
                        <Col key={country.name} className="table-div" xs="3">
                            <Link to={`/countries/${country.name}`}>
                                <ListGroup horizontal className="list-group-items">
                                    <ListGroupItem className="d-flex align-items-center" key={country.name}>
                                        <div className="league-flag">
                                            <img alt="" className="country-flag" src={country.flag} />
                                        </div>

                                        <div>
                                            <div className="football-normal-text">{country.name}</div>
                                        </div>
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
        if (this.state.countriesLoading) {
            return <div className="spinner"><Spinner color="primary" /></div>
        }

        if (!this.state.countries) {
            return <ErrorPage />;
        }

        return (
            <div>
                <h1 id="tabelLabel">Countries</h1>
                {this.renderCountriesTable()}
            </div>
        );
    }

    async populateCountriesData() {
        const response = await fetch('api/Countries');
        const data = await response.json();
        this.setState({ countries: data, countriesLoading: false });
    }
}
