import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
const output='public/media/arrival.mp4';
if(existsSync(output))throw new Error('Refusing to overwrite a production film');
const result=spawnSync('ffmpeg',['-v','error','-f','lavfi','-i','testsrc2=size=320x180:rate=24','-t','4','-c:v','libx264','-pix_fmt','yuv420p','-g','6','-movflags','+faststart',output],{stdio:'inherit'});
if(result.status!==0)process.exit(1);
