import axios from 'axios';

const URL = '';

export const fetchParkingLots = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
        }
    });

    return [
        {
            "id": "600",
            "timestamp": "2021-01-23T22:05:07.488+00:00",
            "location": {
                "latitude": 44.44,
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
                "latitude": 44.4401,
                "longitude": 26.1
            },
            "type": "ILLEGAL",
            "description": "Un idiot a parcat pe interzis",
            "base64EncodedPhoto": null,
            "reputationScore": 0,
            "tag": "Masini pe interzis"
        },
        {
            "id": "602",
            "timestamp": "2021-01-23T22:05:07.488+00:00",
            "location": {
                "latitude": 44.48,
                "longitude": 26.2
            },
            "type": "ILLEGAL",
            "description": "Un idiot a parcat pe interzis",
            "base64EncodedPhoto": null,
            "reputationScore": 0,
            "tag": "Masini pe interzis"
        }
    ];
}