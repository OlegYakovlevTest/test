import React from 'react';

export default class SearchBox extends React.Component {
    static propTypes = {
        placeholder: React.PropTypes.string,
        onPlacesChanged: React.PropTypes.func
    }
    render() {
        return <input ref="input" type="text"/>;
    }
    onPlacesChanged = () => {
        if (this.props.onPlacesChanged) {
            this.props.onPlacesChanged(this.searchBox.getPlaces());
        }
    }
    componentDidMount() {
        const centerSfo = new google.maps.LatLng(46.47, 30.74);
        const circle = new google.maps.Circle({radius: 5000, center: centerSfo});
        const bounds = circle.getBounds();
        console.log('bounds', bounds);
        var input = this.refs.input;
        this.searchBox = new google.maps.places.SearchBox(input, {
            bounds: bounds
        });
        this.searchBox.addListener('places_changed', this.onPlacesChanged);
    }
    componentWillUnmount() {
        this.searchBox.removeListener('places_changed', this.onPlacesChanged);
    }
}