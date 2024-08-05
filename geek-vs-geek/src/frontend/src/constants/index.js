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
  

  export const teamInfo = [
    {
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png",
        name: "India",
        type: "Team",
    },
    {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/280px-Flag_of_Australia.svg.png",
        name: "Australia",
        type: "Team",
    },
    {
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/640px-Flag_of_England.svg.png",
        name: "England",
        type: "Team",
    },
    {
        imageUrl: "https://geo5.net/imagens/Bandeira-da-Africa-do-Sul.png",
        name: "South Africa",
        type: "Team",
    },{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/1024px-Flag_of_New_Zealand.svg.png",
        name: "New Zealand",
        type: "Team",
    },
    {
        imageUrl: "https://www.mrflag.com/wp-content/uploads/2018/11/Pakistan.png",
        name: "Pakistan",
        type: "Team",
    },{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/800px-Flag_of_Bangladesh.svg.png",
        name: "Bangladesh",
        type: "Team",
    },{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg",
        name: "Sri Lanka",
        type: "Team",
    },{
        imageUrl: "https://cdn.britannica.com/40/5340-004-B25ED5CF/Flag-Afghanistan.jpg",
        name: "Afghanistan",
        type: "Team",
    },{
        imageUrl: "https://ssl.gstatic.com/onebox/media/sports/logos/6om0X7vSyKW3Lj4AVpqWIQ_96x96.png",
        name: "West Indies",
        type: "Team",
    },{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1024px-Flag_of_the_Netherlands.svg.png",
        name: "Netherlands",
        type: "Team",
    },{
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Flag_of_Canada.svg/1024px-Flag_of_Canada.svg.png",
        name: "Canada",
        type: "Team",
    },{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/1024px-Flag_of_Ireland.svg.png",
        name: "Ireland",
        type: "Team",
    },{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Namibia.svg/1024px-Flag_of_Namibia.svg.png",
        name: "Namibia",
        type: "Team",
    },{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Flag_of_Zimbabwe.svg/1024px-Flag_of_Zimbabwe.svg.png",
        name: "Zimbabwe",
        type: "Team",
    },{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/300px-Flag_of_Kenya.svg.png",
        name: "Kenya",
        type: "Team",
    },{
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/1024px-Flag_of_Scotland.svg.png",
        name: "Scotland",
        type: "Team",
    },
    {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1024px-Flag_of_the_United_Arab_Emirates.svg.png",
        name: "U.A.E.",
        type: "Team",
    }
];