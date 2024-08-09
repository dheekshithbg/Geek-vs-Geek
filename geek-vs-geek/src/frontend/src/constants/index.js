import {
    linkedin,
    github,
    email
} from "../assets";

export const LANGUAGE_VERSIONS = {
    c: "GCC 9.3.0",
    cpp: "G++ 9.3.0",
    java: "15.0.2",
    python: "3.10.0",
    javascript: "18.15.0",
  };
  
  export const CODE_SNIPPETS = {
    c: `#include <stdio.h>\n\nvoid greet(const char *name) {\n\tprintf("Hello, %s!\\n", name);\n}\n\nint main() {\n\tgreet("Alex");\n\treturn 0;\n}\n`,
    cpp: `#include <iostream>\n\nvoid greet(const std::string &name) {\n\tstd::cout << "Hello, " << name << "!" << std::endl;\n}\n\nint main() {\n\tgreet("Alex");\n\treturn 0;\n}\n`,
    java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  };
  

  export const socialLinks = [
    {
        name: 'Email',
        iconUrl: email,
        link: 'mailto:dheekshithbg@gmail.com',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/dheekshithbg',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/dheekshithbg',
    }
];