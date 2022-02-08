import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestData = () => {
    const [infoData, setInfoData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchData = await axios.get('https://jsonplaceholder.typicode.com/posts?_page=' + page + '&_limit=' + 10);
                setInfoData(fetchData.data);
                setLoading(false);
            }
            catch (err) {
                console.error(err);
            }
        }
        getData();
    }, [page]);

    return (
        <div className="App" onScroll={scrollToEnd}>
            <h1>Hello</h1>
            {loading && <h3>Loading...</h3>}
            {infoData.map(item =>
                <div className='container' key={item.id} >
                    <div className='title'>
                        <h4>Title: {item.title}</h4>
                    </div>
                    <h4>{item.body}</h4>
                </div>

            )}

        </div>
    )
}

export default TestData;