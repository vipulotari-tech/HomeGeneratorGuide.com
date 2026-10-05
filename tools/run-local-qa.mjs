import {spawn} from 'node:child_process';
const server=spawn('python3',['-m','http.server','8321','--bind','127.0.0.1','--directory','dist'],{stdio:'ignore'});
await new Promise(r=>setTimeout(r,700));
try{for(const script of process.argv.slice(2)){const code=await new Promise(resolve=>{const p=spawn(process.execPath,[script],{stdio:'inherit',env:{...process.env,BASE_URL:'http://127.0.0.1:8321'}});p.on('exit',resolve)});if(code){process.exitCode=code;break;}}}finally{server.kill();}
