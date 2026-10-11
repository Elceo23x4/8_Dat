import {existsSync} from 'node:fs';
// configure-pages provides the correct path for project Pages and custom domains.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const arrival = process.env.NEXT_PUBLIC_ARRIVAL_VIDEO ||
  (existsSync('public/media/arrival-with-consultant.mp4') ? '/media/arrival-with-consultant.mp4' :
   existsSync('public/media/arrival.mp4') ? '/media/arrival.mp4' :
   existsSync('public/media/arrival.webm') ? '/media/arrival.webm' : '');
export default {
  output: 'export', trailingSlash: true, basePath,
  images: {unoptimized: true}, poweredByHeader: false,
  env: {NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_ARRIVAL_VIDEO: arrival, NEXT_PUBLIC_FILM_INCLUDES_CONSULTANT: String(arrival.includes('arrival-with-consultant'))}
};
