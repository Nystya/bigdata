// import axios from 'axios';

// const URL = '';

export const fetchIllegalParking = async (query) => {
    // const { data } = await axios.get(URL, {
    //     params: {
    //     }
    // });

    // return data;

    return [
        {
            "id": "600",
            "timestamp": "2021-01-23T22:05:07.488+00:00",
            "location": {
                "latitude": 44.47,
                "longitude": 26.1
            },
            "type": "ILLEGAL",
            "description": "Un idiot a parcat pe interzis",
            "base64EncodedPhoto": null,
            "reputationScore": 0,
            "tag": "Masini pe interzis"
        },
        {
            "id": "601",
            "timestamp": "2021-01-23T22:05:07.488+00:00",
            "location": {
                "latitude": 44.45,
                "longitude": 26.2
            },
            "type": "ILLEGAL",
            "description": "Un idiot a parcat pe interzis",
            "base64EncodedPhoto": null,
            "reputationScore": 0,
            "tag": "Masini pe interzis"
        }
    ]
}