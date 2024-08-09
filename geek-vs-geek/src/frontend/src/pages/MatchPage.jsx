import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import LanguageSelector from '../components/LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton, Snackbar, Alert, Button } from '@mui/material';
import { supabase } from './supabaseClient';
import TestCase from '../components/TestCase';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const MatchPage = () => {
  const editorRef = useRef();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('java');
  const [theme, setTheme] = useState('vs-light');
  const [problem, setProblem] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [matchStatus, setMatchStatus] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { sessionId, username } = useParams();

  useEffect(() => {
    const fetchSessionAndProblem = async () => {
      const { data: session, error: sessionError } = await supabase
        .from('session')
        .select('question_id')
        .eq('session_id', sessionId)
        .single();

      if (sessionError) {
        console.error('Error fetching session:', sessionError);
        return;
      }

      const { question_id } = session;
      const { data: problem, error: problemError } = await supabase
        .from('Problem')
        .select('*')
        .eq('id', question_id)
        .single();

      if (problemError) {
        console.error('Error fetching problem:', problemError);
        return;
      }
      setProblem(problem);

      const { data: testCases, error: testCasesError } = await supabase
        .from('TestCase')
        .select('*')
        .eq('problem_id', question_id);

      if (testCasesError) {
        console.error('Error fetching test cases:', testCasesError);
        return;
      }
      setTestCases(testCases);
    };

    fetchSessionAndProblem();

    const client = new Client({
      brokerURL: 'import.meta.env.VITE_API_ROOT_URL',
      onConnect: () => {
        console.log('Connected to WebSocket');

        client.subscribe(`/topic/match/${sessionId}`, message => {
          const newStatus = JSON.parse(message.body);
          console.log(newStatus);
          setMatchStatus(prevStatus => [...prevStatus, newStatus.message]);

          if (newStatus.passedTestCasesCount === 3) {
            setSnackbarMessage(`${newStatus.userId} has completed!`);
            setOpenSnackbar(true);
          } else {
            setSnackbarMessage(newStatus.message || 'Status update received');
          }
          setSnackbarOpen(true);
        });
      },
      debug: (str) => {
        console.log(str);
      }
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [sessionId]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'vs-light' ? 'vs-dark' : 'vs-light'));
  };

  const handleRunTests = () => {
    setMatchStatus(prevStatus => [...prevStatus, 'Running test cases...']);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseBigSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="p-4">
      <div>
      <h1 className="text-center text-3xl font-bold mb-4">Coding Arena</h1>
        <p>
          Session ID: {sessionId}
          <CopyToClipboard text={sessionId}>
            <button className="ml-1 p-0.5 bg-blue-500 text-white rounded">Copy to clipboard</button>
          </CopyToClipboard>
        </p>
        <p>Username: {username}</p>
      </div>
      <div className="mb-4 p-4 bg-gray-100 rounded shadow overflow-y-auto max-h-80">
        {problem && (
          <div>
            <h3 className="text-xl font-semibold">{problem.title}</h3>
            <p><i>{problem.description}</i></p>
            <p><strong>Input Format:</strong> {problem.inputFormat}</p>
            <p><strong>Output Format:</strong> {problem.outputFormat}</p>
            <p><strong>Sample Input:</strong> {problem.sampleInput}</p>
            <p><strong>Sample Output:</strong> {problem.sampleOutput}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-full overflow-y-auto p-4 bg-gray-100 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <LanguageSelector language={language} onSelect={onSelect} />
            <IconButton
              sx={{
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'primary.main',
                padding: '4px',
              }}
              onClick={toggleTheme}
            >
              {theme === 'vs-light' ? <DarkModeIcon color="primary" /> : <LightModeIcon color="primary" />}
            </IconButton>
          </div>
          <div className="border rounded-lg shadow-lg p-2">
            <Editor
              options={{ minimap: { enabled: false } }}
              height="60vh"
              theme={theme}
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={setValue}
            />
          </div>
          {/* <button onClick={handleRunTests} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Run Test Cases
          </button> */}
        </div>
        <div className="grid grid-rows-2 gap-4">
          <TestCase
            testCases={testCases}
            editorRef={editorRef}
            language={language}
            setMatchStatus={setMatchStatus}
            sessionId={sessionId}
            username={username}
          />
          <div className="h-full max-h-80 overflow-y-auto p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-semibold">Match Status</h3>
            <div>
              {Array.isArray(matchStatus) && matchStatus.map((status, index) => (
                <p key={index}>{status}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseBigSnackbar}>
        <Alert onClose={handleCloseBigSnackbar} severity="success" variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MatchPage;
