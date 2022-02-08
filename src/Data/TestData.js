import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestData = () => {
    const [infoData, setInfoData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {

        getData();
    }, []);

    const getData = async () => {
        try {
            const fetchData = await axios.get('https://jsonplaceholder.typicode.com/posts?_page=' + page + '&_limit=' + 10);
            setInfoData(fetchData.data);
        }
        catch (err) {
            console.error(err);
        }
    }

    // const getData = () => {
    //     axios.get('https://jsonplaceholder.typicode.com/posts')
    //         .then(response => {
    //             setInfoData(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    return (
        <div className="App">
            <h1>Hello World</h1>
            {infoData.map(item =>
                <h3 key={item.id}>Title: {item.title}</h3>
            )}
        </div>
    )
}

export default TestData;