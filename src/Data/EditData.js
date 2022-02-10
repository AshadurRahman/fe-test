import React, { useState, useContext } from 'react';
import { DataContext } from '../Contexts/DataContext';
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
    const [disable, setDisable] = useState(true);
    const [id, setId] = useState(0);
    const [body, setBody] = useState('');

    const { infoData } = useContext(DataContext);

    const handleOpen = () => {
        setOpen(true);
        getData();
        console.log(infoData.slice(0, 10));
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

    const handleIdChange = (e) => {
        setId(e.target.value);
        setDisable(false);
    }

    const handleBodyChange = (e) => {
        setBody(e.target.value);
        setDisable(false);
    }

    const onSubmit = () => {
        localStorage.setItem('id', id);
        localStorage.setItem('body', body);
        handleClose();
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
                            id="title-required"
                            label="Title"
                            value={id}
                            onChange={handleIdChange}
                        />
                        <TextField
                            id="body-multiline-static"
                            multiline
                            rows={5}
                            value={body}
                            onChange={handleBodyChange}
                        />
                    </div>
                    <div className='buttons'>
                        <Button color="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                        {
                            !disable ?
                                <Button color="primary" onClick={onSubmit} size="large">
                                    Save
                                </Button> :
                                <Button color="primary" onClick={onSubmit} size="large" disabled>
                                    Save
                                </Button>
                        }
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default EditData;
