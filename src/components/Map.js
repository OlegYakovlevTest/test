import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import { Map, Marker } from '2gis-maps-react';
import { connect } from 'react-redux';
import { saveMarkers, getMarkers } from '../actions/MarkerActions';
// import $ from 'jquery';

@connect(state => ({
    markers: state.marker.markers,
    user: state.user
}), {saveMarkers, getMarkers})

export default class Authorization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 54.98,
            longitude: 82.89,
            coords: this.props.markers
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
                    geoclicker={true}
                    onClick={this.onMapClick}
                >
                    {this.state.coords.map((item, index) => {
                        return <Marker key={'marker' + index}
                            pos={[item.lat, item.lng]}
                        />
                    })}
                </Map>
                <div>
                    {this.state.coords.map((item, index) => {
                        console.log(item);
                        return <span key={'info' + index}>{`${item.lat}, ${item.lng}`}<br/></span>
                    })}
                </div>
                <button disabled={this.state.coords.length < 1} onClick={this.saveMarkers}>Save</button>
            </div>
        );
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
        this.props.getMarkers();
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.coords.length < nextProps.markers.length) {
            this.setState({coords: nextProps.markers})
        }
    }

    saveMarkers = () => {
        this.props.saveMarkers(this.state.coords);
        console.log('save markers');
    }

    onMapClick = (e) => {
        const existedMarker = this.state.coords.find(el => {
            return el.lat === e.latlng.lat && el.lng === e.latlng.lng;
        });
        if (!existedMarker) {
            this.setState({
                coords: [
                    ...this.state.coords,
                    {
                        username: this.props.user.username,
                        lat: e.latlng.lat,
                        lng: e.latlng.lng
                    }]
            });
        }
    }

    setLocation = (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }
}