'use client';
import {useEffect,useRef,useState} from 'react';
import {assetURL} from '../lib/assets.mjs';
export default function ArrivalFilm({src,progressRef,reduced,onFailure}){
 const ref=useRef(null),[ready,setReady]=useState(false),[failed,setFailed]=useState(false);
 useEffect(()=>{
  if(reduced||failed)return;
  const video=ref.current;if(!video)return;let frame=0,visible=true,last=0,announced=false;
  const loaded=()=>{if(!announced){announced=true;setReady(true);}};
  const failedMedia=()=>{setFailed(true);onFailure?.();};
  video.addEventListener('loadeddata',loaded);video.addEventListener('error',failedMedia);
  if(video.readyState>=2)loaded();else if(video.error)failedMedia();else video.load();
  const pointer=e=>{video.style.setProperty('--film-x',`${(e.clientX/innerWidth-.5)*-10}px`);video.style.setProperty('--film-y',`${(e.clientY/innerHeight-.5)*-6}px`);};
  window.addEventListener('pointermove',pointer,{passive:true});
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(video);
  function seek(now){
   if(video.error){failedMedia();return;}
   if(video.readyState>=2)loaded();
   if(visible&&!document.hidden&&video.readyState>=2&&Number.isFinite(video.duration)&&!video.seeking&&now-last>40){
    const target=Math.min(progressRef.current*Math.max(0,video.duration-.05),video.duration-.05);
    if(Math.abs(video.currentTime-target)>.045)video.currentTime=target;
    last=now;
   }
   frame=requestAnimationFrame(seek);
  }
  frame=requestAnimationFrame(seek);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',pointer);video.removeEventListener('loadeddata',loaded);video.removeEventListener('error',failedMedia);video.pause();};
 },[progressRef,reduced,failed,onFailure]);
 if(reduced||failed)return null;
 return <video ref={ref} className={`arrival-film ${ready?'is-ready':''}`} src={src} muted playsInline preload="auto" poster={assetURL('/art/headquarters-poster.webp')} onLoadedData={()=>setReady(true)} onError={()=>{setFailed(true);onFailure?.();}} aria-hidden="true"/>;
}
