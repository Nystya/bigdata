import axios from 'axios';
import baseURL from '../config/config';

const illegalParkingURL = baseURL + "/api/illegalparkingevent";

export const fetchIllegalParking = async (token, query) => {
    console.log(query);

    const { data } = await axios.get(illegalParkingURL, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        params: query
    });

    return data;
}