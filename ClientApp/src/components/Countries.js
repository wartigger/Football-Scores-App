import React, { Component } from 'react';
import { Link, useParams  } from "react-router-dom";
import { Spinner, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';

export const displayName = "Countries";

export class Countries extends Component {

    constructor(props) {
        super(props);
        this.state = { countries: [], loading: true };
    }

    componentDidMount() {
        this.populateCountriesData();
    }

    renderCountriesTable(countries) {
        return (
            <Container>
                <Row>
                    {countries.map(country =>
                        <Col className="table-div" xs="3">
                            <Link to={`/countries/${country.name}`}>
                                <ListGroup horizontal className="list-group-items">
                                    <ListGroupItem className="d-flex align-items-center" key={country.name} tag="a" href="">
                                        <div className="league-flag">
                                            <img className="country-flag" src={country.flag} />
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
        let contents = this.state.loading
            ? <div className="spinner"><Spinner color="primary" /></div>
            : this.renderCountriesTable(this.state.countries, this.props.match.url);

        return (
            <div>
                <h1 id="tabelLabel">Countries</h1>
                {contents}
            </div>
        );
    }

    async populateCountriesData() {
        const response = await fetch('api/Football');
        const data = await response.json();
        this.setState({ countries: data, loading: false });
    }
}
