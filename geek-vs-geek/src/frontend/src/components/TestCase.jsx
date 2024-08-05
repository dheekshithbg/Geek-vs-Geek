import React, { useState } from "react";
import { executeCode } from "./executeCode";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const TestCase = ({ testCases, editorRef, language, setMatchStatus }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const runTestCases = async () => {
    if (testCases.length === 0) return;

    setLoading(true);
    setMatchStatus("Running test cases...");
    const sourceCode = editorRef.current.getValue();
    const testCaseResults = [];

    for (const testCase of testCases) {
      try {
        const result = await executeCode(language, sourceCode, testCase.input);
        const output = result.run.output || "No Output";
        const expectedOutput = testCase.expectedOutput || "No Expected Output";
        const isSuccess = output.trim() === expectedOutput.trim();
        
        testCaseResults.push({
          input: testCase.input,
          expectedOutput,
          output,
          status: isSuccess ? "Success" : "Failed",
          statusColor: isSuccess ? "success" : "error",
          statusIcon: isSuccess ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />,
        });
      } catch (error) {
        console.error("Error executing code:", error);
        testCaseResults.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput || "No Expected Output",
          output: "Error",
          status: "Failed",
          statusColor: "error",
          statusIcon: <ErrorIcon color="error" />,
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay of 1 second
    }

    setResults(testCaseResults);
    setMatchStatus("Test cases executed");
    setLoading(false);

    // Check if all test cases passed
    if (testCaseResults.every((result) => result.status === "Success")) {
      setSnackbarMessage("You have won Geek!");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="h-full overflow-y-auto p-4 bg-gray-100 rounded shadow">
      <h3 className="text-lg font-semibold">Test Cases</h3>
      <Button variant="contained" color="primary" onClick={runTestCases}>
        Run Test Cases
      </Button>
      {loading ? (
        <LinearProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Input</TableCell>
                <TableCell>Expected Output</TableCell>
                <TableCell>Output</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <pre>{result.input}</pre>
                  </TableCell>
                  <TableCell>
                    <pre>{result.expectedOutput}</pre>
                  </TableCell>
                  <TableCell>
                    <pre>{result.output}</pre>
                  </TableCell>
                  <TableCell>
                    <span style={{ color: result.statusColor }}>
                      {result.statusIcon}
                      {result.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TestCase;
