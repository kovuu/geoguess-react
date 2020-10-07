import React from "react";
import {GoogleApiWrapper, Map, Marker, Polyline} from "google-maps-react";
import  './GameField.css';




const mapStyle = [{
    "featureType": "all",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
}]},
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }],
    }, {}]

const GameField = ({estimated, currentCity, setEstimated, google, gameOver, victory, dispCoordinates, pickedCoords}) => {

    function onClick(t, map, coords) {
        if (victory || gameOver) return;
        const latLng = coords.latLng;
        const coordinates = {lat: latLng.lat(), lng: latLng.lng()};
        dispCoordinates({type: 'SET_COORDS', coordinates});
    }

    function _mapLoaded(mapProps, map) {
        map.setOptions({
            styles: mapStyle
        })
    }

    return (

            currentCity && <Map
            containerStyle={{
                position: 'absolute',
                left: '10%',
                right: '10%',
                top: '30%',
                width: '80%',
                height: '60%'
            }}
            mapTypeControl={false}
            fullscreenControl={false}
            streetViewControl={false}
            google={google}
            zoom={4}
            initialCenter={{
                lat: 48.727892167837695,
                lng: 15.126317944746383
            }}
            onClick={(!gameOver || !victory) ? onClick : null}
            onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
        >
            {(pickedCoords && pickedCoords.isPicked && estimated.lat) && <Marker
                position={currentCity.coords}
            />}
            {(pickedCoords && pickedCoords.coords) && <Marker
                position={pickedCoords.coords}
            />}

            {(pickedCoords && pickedCoords.isPicked && estimated.lat && currentCity.coords.lat) ?  <Polyline
                path={[currentCity.coords, estimated]}
            /> : null}
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(GameField);
