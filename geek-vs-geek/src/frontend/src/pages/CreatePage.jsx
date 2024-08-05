import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CreatePage = () => {
    const [questions, setQuestions] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [usernameDialogOpen, setUsernameDialogOpen] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            const { data, error } = await supabase
                .from('Problem')
                .select('id, title, description');

            if (error) {
                console.error('Error fetching questions:', error);
            } else {
                setQuestions(data);
            }
        };

        fetchQuestions();
    }, []);

    const handleDialogOpen = (question) => {
        setSelectedQuestion(question);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setSelectedQuestion(null);
        setOpenDialog(false);
    };

    const handleContinue = () => {
        setOpenDialog(false);
        setUsernameDialogOpen(true);
    };

    const handleUsernameDialogClose = () => {
        setUsernameDialogOpen(false);
    };
    const handleEnterArena = async () => {
      if (selectedQuestion && username) {
          const sessionId = Math.random().toString(36).substring(2, 15); // Generate a random session ID
          const { error } = await supabase
              .from('session')
              .insert([{ session_id: sessionId, question_id: selectedQuestion.id, created_by: username }]);

          if (error) {
              console.error('Error creating session:', error);
          } else {
              navigate(`/match/${sessionId}/${username}`);
          }
      }
  };

    return (
        <section className='home-container'>
            <div className='py-7 flex flex-col items-center'>
                <h1 className='sub-head-text text-center mb-8'>Select a problem</h1>
                <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-12 justify-center items-center'>
                    {questions.map((question) => (
                        <div key={question.id} className='block-container relative w-32 h-32'>
                            <div className='rounded-xl absolute inset-0 bg-gray-200'></div>
                            <div className='btn-front rounded-xl flex flex-col justify-center items-center relative'>
                                <h2 className='text-sm'>{question.title}</h2>
                                <IconButton onClick={() => handleDialogOpen(question)}>
                                    <AddCircleIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>{selectedQuestion?.title}</DialogTitle>
                <DialogContent>
                    <p>{selectedQuestion?.description}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleContinue}>Continue</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={usernameDialogOpen} onClose={handleUsernameDialogClose}>
                <DialogTitle>Enter your username</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUsernameDialogClose}>Cancel</Button>
                    <Button onClick={handleEnterArena}>Enter Arena</Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};

export default CreatePage;
