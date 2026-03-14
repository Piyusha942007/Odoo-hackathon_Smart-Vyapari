import { spawn } from 'child_process';
import fs from 'fs';
const child = spawn('node', ['server.js']);
let logData = '';
child.stdout.on('data', data => logData += "STDOUT:" + data.toString() + "\n");
child.stderr.on('data', data => logData += "STDERR:" + data.toString() + "\n");
child.on('close', code => {
    fs.writeFileSync('error_log.txt', logData);
    process.exit(code);
});
