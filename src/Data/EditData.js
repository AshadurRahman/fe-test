import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        height: 300,
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const EditData = ({ data }) => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const [body, setBody] = useState('');

    const handleOpen = () => {
        setOpen(true);
        getData();
    };
    const handleClose = () => {
        setOpen(false);
    };

    const getData = async () => {
        try {
            const fetchData = await axios.get(`https://jsonplaceholder.typicode.com/posts/${data}`);
            // setInfoData(fetchData.data);
            console.log(fetchData.data.id);
            setId(fetchData.data.id);
            setBody(fetchData.data.body);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <EditIcon className='icon' onClick={handleOpen} />
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Edit</h2>
                    <input value={id} onChange={(e) => setId(e.target.value)} />
                    <input value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
            </Modal>
        </div>
    );
}

export default EditData;
