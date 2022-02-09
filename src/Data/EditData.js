import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@material-ui/core/Modal';
import TextField from '@mui/material/TextField';

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
        height: 400,
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
            setId(fetchData.data.id);
            setBody(fetchData.data.body);
        }
        catch (err) {
            console.error(err);
        }
    }

    const onSubmit = () => {
        console.log("id", id);
        console.log("body", body);
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
                    <div className='inputs'>
                        <TextField
                            required
                            id="outlined-required"
                            label="Title"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={5}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <div className='buttons'>
                        <Button color="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={onSubmit}>
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default EditData;
