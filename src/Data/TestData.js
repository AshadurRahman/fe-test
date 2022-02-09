import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditData from './EditData';
import { DataContext } from '../Contexts/DataContext';

const TestData = () => {
    const [infoData, setInfoData] = useState([]);
    const [visible, setVisible] = useState(10);

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchData = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
                setInfoData(fetchData.data);
            }
            catch (err) {
                console.error(err);
            }
        }
        getData();
    }, []);

    const loadMoreData = () => {
        setVisible(visible + 10);
    }

    return (
        <div className="App">
            <div className='container'>
                <DataContext.Provider value={{ infoData }}>
                    {infoData.slice(0, visible).map(item =>
                        <div className='card' key={item.id} >
                            <div className='id'>
                                <h4>Title: {item.id}</h4>
                                <EditData data={item.id} />
                            </div>
                            <p>{item.body}</p>
                        </div>
                    )}
                </DataContext.Provider>
            </div>
            <div className='loader'>
                <h5>{visible} of {infoData.length}</h5>
                {visible < infoData.length ?
                    <button onClick={loadMoreData}>Load More</button>
                    : null
                }
            </div>
            <EditData />
        </div>
    )
}

export default TestData;
