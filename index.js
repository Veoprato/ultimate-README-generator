const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Question array for user
const userQuestions = () => {
    console.log(`
██╗   ██╗██╗  ████████╗██╗███╗   ███╗ █████╗ ████████╗███████╗    ██████╗ ███████╗ █████╗ ██████╗ ███╗   ███╗███████╗
██║   ██║██║  ╚══██╔══╝██║████╗ ████║██╔══██╗╚══██╔══╝██╔════╝    ██╔══██╗██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝
██║   ██║██║     ██║   ██║██╔████╔██║███████║   ██║   █████╗      ██████╔╝█████╗  ███████║██║  ██║██╔████╔██║█████╗  
██║   ██║██║     ██║   ██║██║╚██╔╝██║██╔══██║   ██║   ██╔══╝      ██╔══██╗██╔══╝  ██╔══██║██║  ██║██║╚██╔╝██║██╔══╝  
╚██████╔╝███████╗██║   ██║██║ ╚═╝ ██║██║  ██║   ██║   ███████╗    ██║  ██║███████╗██║  ██║██████╔╝██║ ╚═╝ ██║███████╗
 ╚═════╝ ╚══════╝╚═╝   ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚══════╝
 ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗                                         
██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗                                        
██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝                                        
██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗                                        
╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║                                        
 ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝     By: Tommy Veopraseut               
`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'gitUser',
            message: 'Please enter your GitHub Username (Required):',
            validate: gitUserInput => {
                if (gitUserInput) {
                    return true;
                } else {
                    console.log("PLEASE ENTER A USERNAME!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter your email address (Required):',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log("PLEASE ENTER AN EMAIL ADDRESS!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'projectTitle',
            message: 'Please enter the name of your project (Required):',
            validate: projectTitleInput => {
                if (projectTitleInput) {
                    return true;
                } else {
                    console.log("PLEASE ENTER A PROJECT NAME!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'projectDesc',
            message: 'Please provide a brief description about your project:'
        },
        {
            type: 'input',
            name: 'installationInfo',
            message: 'What are the steps required to install your project:'
        },
        {
            type: 'input',
            name: 'usageInfo',
            message: 'Provide instructions and examples for use:'
        },
        {
            type: 'input',
            name: 'contributionInfo',
            message: 'For other developers to contribute it, add guidelines on how to do so:'
        },
        {
            type: 'input',
            name: 'testInfo',
            message: 'Write tests for your application, and provide examples on how to run them:'
        },
        {
            type: 'list',
            name: 'licenseInfo',
            message: 'What license are you using for this project?',
            choices: ['Apache 2.0', 'Boost 1.0', 'BSD 3-Clause', 'BSD 2-Clause', 'CC0', 'Attribution 4.0 International', 'Eclipse Public License 1.0', 'GNU GPL v3', 'GNU GPL v2', 'GNU AGPL v3', 'GNU LGPL v3', 'GNU FDL v1.3', 'Hippocratic 2.1', 'Hippocratic 3.0', 'IBM Public License 1.0', 'ISC', 'MIT', 'Mozilla Public License 2.0', 'ODC BY', 'ODbL', 'PDDL', 'Perl', 'Artistic 2.0', 'SIL OFL 1.1', 'Unlicense', 'WTFPL', 'Zlib']
        },
        {
            type: 'confirm',
            name: 'tableContents',
            message: 'Would you like to add a Table of Contents?',
            default: true
        }
    ])
    // .then(answers => console.log(answers));
}

// Function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, error => {
            if (error) {
                console.log(error);
                return;
            }
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};


// Function to initialize app
function init() {
    userQuestions()
        .then(data => {
            return generateMarkdown(data);
        })
        .then(pageMD => {
            return writeFile(pageMD);
        })
        .then(writeFileResponse => {
            console.log(writeFileResponse);
        })
        .catch(err => {
            console.log(err);
        });
};
// Function call to initialize app
init();
