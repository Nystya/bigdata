import React from 'react';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Marker from 'react-leaflet-enhanced-marker';
import { Popup } from 'react-leaflet';

import { fetchIllegalParking} from '../api/fetchIllegalParking';

import illegalParkingMarker from './assets/illegal-parking-marker.png'

import likeIcon from './assets/like-icon.png';
import dislikeIcon from './assets/dislike-icon.png';

import baseURL from '../config/config';

import './styles/IllegalParkingReports.css';
import axios from 'axios';

const likeURL = baseURL + '/api/illegalparkingevent/';

class IconComponent extends React.Component {
    render() {
        return <img width="30px" height="30px" src={illegalParkingMarker} alt="User Location"/>
    }
}

class IllegalParkingReports extends React.Component  {
    state = {
        illegalParkingReports: []
    }

    componentDidMount = () => {
        fetchIllegalParking(localStorage.getItem("Auth"), this.props)
        .then((reports) => {
            if (reports) {
                this.setState({illegalParkingReports: reports});
            }
            console.log(reports);
        })
        .catch((err) => console.log(err));
    }

    handleClusterClick = (cluster) => {
        console.log("Cluster Click", cluster,  cluster.layer.getAllChildMarkers());
    }

    handleLikeClick = (event, id) => {
        axios.put(likeURL + id, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Auth')
            },
            params: {type: "LIKE"}
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    handleDislikeClick = (event, id) => {
        axios.put(likeURL + id, {} ,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Auth')
            },
            params: {type: "LIKE"}
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    render() {
        return (
            <MarkerClusterGroup onClusterClick={this.handleClusterClick}>
                {this.state.illegalParkingReports.map((report, idx) => {
                    const lat = report.location.latitude;
                    const lng = report.location.longitude;
    
                    return (
                        <Marker key={idx} position={{lat, lng}} icon={<IconComponent/>}>
                            <Popup>
                                <div className="popup-container">
                                    <div className="like-container">
                                        <img
                                            src={likeIcon}
                                            onClick={(event) => this.handleLikeClick(event, report.id)} 
                                        />
                                        {report.reputationScore}
                                    </div>
                                    <div className="like-container">
                                        <img 
                                            src={dislikeIcon}
                                            onClick={(event) => this.handleDislikeClick(event, report.id)} 
                                        />
                                        {report.reputationScore}
                                    </div>
                                    
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}
            </MarkerClusterGroup>
        )
    }
}

export default IllegalParkingReports;