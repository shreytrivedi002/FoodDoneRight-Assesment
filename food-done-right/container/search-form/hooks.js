import { useState } from "react";

export const useSearch = () => {
    const [textValue, setTextValue] = useState('');
    const [responseList, setResponseList] = useState([]);
    const [property, setProperty] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // for getting coordinates of users address
    // this API has 15% failure rate
    const getCordinates = async () => {
        await fetch(`http://api.positionstack.com/v1/forward?access_key=c5418bee07ae7db28ae2dca5de7f7c36&limit=10&output=json&query=${textValue}`)
            .then((resp) => {
                resp.json().then((result) => {
                    if (result?.data?.length == 1) {
                        getNearestRestaurant(result?.data[0])
                    }
                    setResponseList(result?.data)
                })
            })
            .catch(error => {
                console.log('Error : ', error);
            })
        setIsLoading(false);
    }

    // func to find the property from our KML data
    const findProperty = async (payload) => {
        fetch('http://localhost:7000/customers/nearestRestro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                setProperty(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getNearestRestaurant = (val) => {
        findProperty({
            coordinate: [val?.longitude, val?.latitude]
        })
    }

    const handleSearch = async () => {
        setIsLoading(true);
        getCordinates(textValue);
    }

    const handleTextUpdate = (value) => {
        setTextValue(value);
    }

    const toggle = () => {
        setProperty('')
    }

    return {
        handleTextUpdate, handleSearch, textValue, responseList, getNearestRestaurant, property, toggle, isLoading
    }
}