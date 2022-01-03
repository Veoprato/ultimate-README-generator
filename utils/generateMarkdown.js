// Import function for all badges + links
const generateBadges = require('../utils/generateBadge');

// Function to generate Table of Contents
const generateTableOfContents = confirmToC => {
  if (!confirmToC) {
    return '';
  }

  return `
  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contribution](#contribution)
  * [Tests](#tests)
  * [Questions](#questions)
  `;
};

// Generate markdown for README
const generateMarkdown = data => {
  
  const {
    gitUser,
    email,
    projectTitle,
    projectDesc,
    installationInfo,
    usageInfo,
    contributionInfo,
    testInfo,
    licenseInfo,
    tableContents
  } = data;

  return `
  # ${projectTitle}
  ${generateBadges(licenseInfo)}
  ## Description
  ${projectDesc}
  ${generateTableOfContents(tableContents)}
  
  ## Installation
  ${installationInfo}
  ## Usage
  ${usageInfo}
  ## License
  This application is covered under the ${licenseInfo} license
  ## Contribution
  ${contributionInfo}
  ## Tests
  ${testInfo}
  ## Questions?
  Find me on Github here: [${gitUser}](https://github.com/${gitUser})

  Or you can email me at ${email}
  `;
}

module.exports = generateMarkdown;
