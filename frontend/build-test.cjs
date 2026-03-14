const { exec } = require('child_process');
const fs = require('fs');

exec('npm run build', (error, stdout, stderr) => {
    fs.writeFileSync('build-log.txt', \`ERROR:\\n\${error ? error.message : ''}\\nSTDOUT:\\n\${stdout}\\nSTDERR:\\n\${stderr}\`);
});
