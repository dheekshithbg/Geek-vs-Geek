import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import LanguageSelector from '../components/LanguageSelector';
import { CODE_SNIPPETS } from '../constants';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { IconButton } from '@mui/material';
import { supabase } from './supabaseClient';
import TestCase from '../components/TestCase';
import { useParams } from 'react-router-dom';

const MatchPage = () => {
    const editorRef = useRef();
    const [value, setValue] = useState('');
    const [language, setLanguage] = useState('java');
    const [theme, setTheme] = useState('vs-light');
    const [problem, setProblem] = useState(null);
    const [testCases, setTestCases] = useState([]);
    const [matchStatus, setMatchStatus] = useState('');
    const { sessionId, username } = useParams();

    useEffect(() => {
        const fetchSessionAndProblem = async () => {
            // Fetch session details to get the associated question ID
            const { data: session, error: sessionError } = await supabase
                .from('session')
                .select('question_id')
                .eq('session_id', sessionId)
                .single();

            if (sessionError) {
                console.error('Error fetching session:', sessionError);
            } else {
                const { question_id } = session;

                const { data: problem, error: problemError } = await supabase
                    .from('Problem')
                    .select('*')
                    .eq('id', question_id)
                    .single();

                if (problemError) {
                    console.error('Error fetching problem:', problemError);
                } else {
                    setProblem(problem);
                }

                const { data: testCases, error: testCasesError } = await supabase
                    .from('TestCase')
                    .select('*')
                    .eq('problem_id', question_id);

                if (testCasesError) {
                    console.error('Error fetching test cases:', testCasesError);
                } else {
                    setTestCases(testCases);
                }
            }
        };

        fetchSessionAndProblem();
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
        setTheme((prevTheme) => (prevTheme === 'vs-light' ? 'vs-dark' : 'vs-light'));
    };

    const handleRunTests = () => {
        // Pass the code and language to TestCase component
        setMatchStatus('Running test cases...');
    };

    return (
        <div className="p-4">
            <div>
                <h1>Coding Arena</h1>
                <p>Session ID: {sessionId}</p>
                <p>Username: {username}</p>
            </div>
            <div className="mb-4 p-4 bg-gray-100 rounded shadow overflow-y-auto max-h-40">
                {problem && (
                    <div>
                        <h3 className="text-xl font-semibold">{problem.title}</h3>
                        <p>
                            <i>{problem.description}</i>
                        </p>
                        <p>
                            <strong>Input Format:</strong> {problem.inputFormat}
                        </p>
                        <p>
                            <strong>Output Format:</strong> {problem.outputFormat}
                        </p>
                        <p>
                            <strong>Sample Input:</strong> {problem.sampleInput}
                        </p>
                        <p>
                            <strong>Sample Output:</strong> {problem.sampleOutput}
                        </p>
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
                            {theme === 'vs-light' ? (
                                <DarkModeIcon color="primary" />
                            ) : (
                                <LightModeIcon color="primary" />
                            )}
                        </IconButton>
                    </div>
                    <div className="border rounded-lg shadow-lg p-2">
                        <Editor
                            options={{
                                minimap: {
                                    enabled: false,
                                },
                            }}
                            height="60vh"
                            theme={theme}
                            language={language}
                            defaultValue={CODE_SNIPPETS[language]}
                            onMount={onMount}
                            value={value}
                            onChange={(value) => setValue(value)}
                        />
                    </div>
                    <button
                        onClick={handleRunTests}
                        className="mt-4 p-2 bg-blue-500 text-white rounded"
                    >
                        Run Test Cases
                    </button>
                </div>
                <div className="grid grid-rows-2 gap-4">
                    <TestCase
                        testCases={testCases}
                        editorRef={editorRef}
                        language={language}
                        setMatchStatus={setMatchStatus} // Ensure this is passed to TestCase
                    />
                    <div className="h-full overflow-y-auto p-4 bg-gray-100 rounded shadow">
                        <h3 className="text-lg font-semibold">Match Status</h3>
                        <p>{matchStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchPage;
