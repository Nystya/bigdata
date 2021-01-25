import axios from 'axios';
import baseURL from '../config/config';

const parkingLotsURL = baseURL + "/api/parkinglots/distance";

export const fetchParkingLots = async (token, query) => {
    const { data } = await axios.get(parkingLotsURL, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        params: query,
    });

    return data;
}