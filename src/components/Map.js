import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import { Map } from '2gis-maps-react';

export default class Authorization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 54.98,
            longitude: 82.89
        };
    }

    render() {
        return (
            <div>
                <PageHeader>Map page</PageHeader>
                <Map
                    style={{width: '500px', height: '500px'}}
                    center={[this.state.latitude, this.state.longitude]}
                    zoom={13}
                />
            </div>
        );
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    setLocation = (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }
}