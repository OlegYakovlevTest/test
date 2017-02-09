import React, {Component} from 'react';
import {PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {saveMarkers, getMarkers} from '../actions/MarkerActions';

@connect(state => ({
    markers: state.marker.markers,
    user: state.user
}), {saveMarkers, getMarkers})

export default class Authorization extends Component {

    constructor(props) {
        super(props);
        this.map = null;
        this.markers = this.props.markers;
        this.state = {
            latitude: -34,
            longitude: 151,
            markersForSave: [],
            coords: this.props.markers
        };
    }

    render() {
        return (
            <div>
                <PageHeader>Map page</PageHeader>
                <input type='text' ref='pacInput'/>
                <div ref='testmap' style={{
                    width: '800px',
                    height: '600px',
                    position: 'relative'
                }}/>
                <div>
                    {this.props.markers.concat(this.state.markersForSave).map((item, index) => {
                        return <span key={'info' + index}>{`${item.lat}, ${item.lng}`}<br/></span>
                    })}
                </div>
                <button disabled={this.state.markersForSave.length < 1} onClick={this.saveMarkers}>Save</button>
            </div>
        );
    }

    componentDidMount() {
        this.initMap();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setLocation);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
        this.props.getMarkers();
    }

    componentWillReceiveProps(nextProps) {
        this.markers.forEach((marker) => {
            if(marker.setMap) {marker.setMap(null);}
        });
        this.markers = [];
        nextProps.markers.forEach((marker) => {
            this.markers.push(new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(marker.lat, marker.lng)
            }));
        });
    }

    initMap = () => {
        this.map = new google.maps.Map(this.refs.testmap, {
            center: {lat: this.state.latitude, lng: this.state.longitude},
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        const input = this.refs.pacInput;
        const searchBox = new google.maps.places.SearchBox(input);

        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        this.map.addListener('bounds_changed', () => {
            searchBox.setBounds(this.map.getBounds());
        });
        this.map.addListener('click', this.onMapClick);

        searchBox.addListener('places_changed', () => {
            const places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            this.markers.forEach((marker) => {
                marker.setMap(null);
            });
            this.markers = [];

            let bounds = new google.maps.LatLngBounds();
            places.forEach((place) => {
                const icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                this.markers.push(new google.maps.Marker({
                    map: this.map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            this.map.fitBounds(bounds);
        });
    };

    saveMarkers = () => {
        this.props.saveMarkers(this.state.markersForSave);
    };

    onMapClick = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        this.markers.forEach((marker) => {
            marker.setMap(null);
        });
        this.markers = [];
        this.props.markers.forEach((marker) => {
            this.markers.push(new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(marker.lat, marker.lng)
            }));
        });
        this.markers.push(new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(lat, lng)
        }));

        this.setState({
            markersForSave: [
                ...this.state.markersForSave,
                {
                    username: this.props.user.username,
                    lat,
                    lng
                }
            ]
        });
    };

    setLocation = (position) => {
        this.map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    }
}