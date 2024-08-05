import axios from "axios";
import { LANGUAGE_VERSIONS } from "../constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode, input) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: input, // Using stdin for multiline input
  });
  console.log(response);
  return response.data;
};
