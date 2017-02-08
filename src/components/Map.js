import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveMarkers, getMarkers } from '../actions/MarkerActions';
// import $ from 'jquery';
import { Gmaps, Marker } from 'react-gmaps';

@connect(state => ({
    markers: state.marker.markers,
    user: state.user
}), {saveMarkers, getMarkers})

export default class Authorization extends Component {

    constructor(props) {
        super(props);
        this.searchParam = '';
        this.state = {
            latitude: 54.98,
            longitude: 82.89,
            coords: this.props.markers
        };
    }

    render() {
        const coords = {
            lat: 46.47,
            lng: 30.74
        };
        return (
            <div>
                <PageHeader>Map page</PageHeader>

                <div>
                    {this.state.coords.map((item, index) => {
                        console.log(item);
                        return <span key={'info' + index}>{`${item.lat}, ${item.lng}`}<br/></span>
                    })}
                </div>
                <button disabled={this.state.coords.length < 1} onClick={this.saveMarkers}>Save</button>
                <input type='text' onChange={this.onSearchParamChange} />
                <button onClick={this.getByType}>Search</button>
                <Gmaps
                    width={'800px'}
                    height={'600px'}
                    lat={coords.lat}
                    lng={coords.lng}
                    zoom={12}
                    loadingMessage={'Be happy'}
                    params={{v: '3.exp', key: 'AIzaSyCDHXjhlHCPZ9gCp2QQD2-tKZ2kuhXJcmY'}}
                    onMapCreated={this.onMapCreated}
                    onClick={this.onMapClick}>
                    {this.state.coords.map((item, index) => {
                        console.log(item);
                        return <Marker key={'marker' + index}
                            lat={item.lat}
                            lng={item.lng}
                            draggable={true}
                            onDragEnd={this.onDragEnd} />
                    })}

                </Gmaps>
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

    onSearchParamChange = (e) => {
        this.searchParam = e.target.value;
    };

    getByType = () => {
        // var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
        // var request = {
        //     location: pyrmont,
        //     radius: '500',
        //     query: 'restaurant'
        // };
        //
        // var service = new google.maps.places.PlacesService(document.createElement('div'));
        //
        // service.getDetails(request, function(place, status) {
        //     console.log(status)
        //     if (status == google.maps.places.PlacesServiceStatus.OK) {
        //         console.log(place)
        //         var marker = new google.maps.Marker({
        //             map: map,
        //             position: place.geometry.location
        //         });
        //         google.maps.event.addListener(marker, 'click', function() {
        //             infowindow.setContent(place.name);
        //             infowindow.open(map, this);
        //         });
        //     }
        // });
        // GMaps.geocode({
        //     address: $('#address').val(),
        //     callback: function(results, status) {
        //         if (status == 'OK') {
        //             var latlng = results[0].geometry.location;
        //             map.setCenter(latlng.lat(), latlng.lng());
        //             map.addMarker({
        //                 lat: latlng.lat(),
        //                 lng: latlng.lng()
        //             });
        //         }
        //     }
        // });
        // $.ajax({
        //     method: 'GET',
        //     url: 'http://catalog.api.2gis.ru/2.0/catalog/branch/search?q=' + this.searchParam + '&region_id=14&key=ruslll3489',
        // }).done(function (data) {
        //     console.log(data);
        // }).fail(function (jqXHR, textStatus) {
        //     console.error(textStatus);
        // });
    };

    saveMarkers = () => {
        this.props.saveMarkers(this.state.coords);
        console.log('save markers');
    };

    onMapClick = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const existedMarker = this.state.coords.find(el => {
            return el.lat === lat && el.lng === lng;
        });
        if (!existedMarker) {
            this.setState({
                coords: [
                    ...this.state.coords,
                    {
                        username: this.props.user.username,
                        lat,
                        lng
                    }]
            });
        }
    };

    setLocation = (position) => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }
}