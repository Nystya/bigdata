import React  from 'react';
import { Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Marker from 'react-leaflet-enhanced-marker';

import { fetchParkingLots } from '../api/fetchParkingLots';

import './styles/FreeParkingLots.css';

import parkingLotMarker from './assets/parking-lot-marker.png';
import baseURL from '../config/config';

import axios from 'axios';

const takeSpotURL = baseURL + "/api/parkinglots/";

class IconComponent extends React.Component {
    render() {
        return <img width="30px" height="30px" src={parkingLotMarker} alt="User Location"/>
    }
}

class FreeParkingLots extends React.Component {
    state = {
        freeParkingLots: []
    }

    componentDidMount = () => {
        fetchParkingLots(localStorage.getItem("Auth"), this.props)
        .then((reports) => {
            if (reports) {
                this.setState({freeParkingLots: reports});
            }
            console.log(reports);
        })
        .catch((err) => console.log(err));
    }    
    
    
    handleClusterClick = (cluster) => {
        console.log("Cluster Click", cluster,  cluster.layer.getAllChildMarkers());
    }

    handleTakeSpot = (event, id) => {
        console.log("Taking spot: ", id);

        axios.patch(takeSpotURL + id, {isFree: "No"}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Auth')
            }
        })
        .then((res) => {
            this.setState((prevState) => {
                const reportIdx = prevState.freeParkingLots.findIndex((obj) => obj._id === id);
                prevState.freeParkingLots[reportIdx].isFree = "No";

                return {...prevState}
            })
        })
        .catch((err) => console.log(err));
    }

    render() {
        return (
            <MarkerClusterGroup onClusterClick={this.handleClusterClick}>
                {this.state.freeParkingLots.map((report) => {
                    const lat = report.location.latitude;
                    const lng = report.location.longitude;

                    return (
                        report.isFree === "Yes" ?
                        <Marker key={report._id} icon={<IconComponent/>} position={{lat, lng}}>
                            <Popup>
                                <div className="popup-container">
                                    <button onClick={(event) => this.handleTakeSpot(event, report._id)}>Take spot</button>
                                </div>
                            </Popup>
                        </Marker>
                        :
                        null
                    )
                })}
            </MarkerClusterGroup>
        )
    }
}

export default FreeParkingLots;