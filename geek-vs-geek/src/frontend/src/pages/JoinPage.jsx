import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const JoinPage = () => {
    const [sessionId, setSessionId] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleJoinArena = () => {
        navigate(`/match/${sessionId}/${username}`);
    };

    return (
        <section className='home-container'>
            <div className='py-7 flex flex-col items-center'>
                <h1 className='sub-head-text text-center mb-8'>Join a session</h1>
                <div className='mt-16'>
                    <TextField
                        label="Session ID"
                        type="text"
                        fullWidth
                        value={sessionId}
                        onChange={(e) => setSessionId(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Username"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        onClick={handleJoinArena}
                        className='mt-4 p-2 bg-blue-500 text-white rounded'
                    >
                        Join Arena
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default JoinPage;
