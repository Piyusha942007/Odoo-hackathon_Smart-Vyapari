import { exec } from 'child_process';
import fs from 'fs';

exec('npm run build', (error, stdout, stderr) => {
    fs.writeFileSync('build-log.txt', \`ERROR:\\n\${error ? error.message : ''}\\nSTDOUT:\\n\${stdout}\\nSTDERR:\\n\${stderr}\`);
});
