'use client';
import {useEffect,useRef,useState} from 'react';
import {assetURL} from '../lib/assets.mjs';
export default function ArrivalFilm({src,progressRef,reduced,onFailure}){
 const ref=useRef(null),[ready,setReady]=useState(false),[failed,setFailed]=useState(false);
 useEffect(()=>{
  if(reduced||failed)return;
  const video=ref.current;let frame=0,visible=true,last=0;
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(video);
  function seek(now){
   if(visible&&!document.hidden&&video.readyState>=2&&Number.isFinite(video.duration)&&!video.seeking&&now-last>40){
    const target=Math.min(progressRef.current*Math.max(0,video.duration-.05),video.duration-.05);
    if(Math.abs(video.currentTime-target)>.045)video.currentTime=target;
    last=now;
   }
   frame=requestAnimationFrame(seek);
  }
  frame=requestAnimationFrame(seek);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();video.pause();};
 },[progressRef,reduced,failed]);
 if(reduced||failed)return null;
 return <video ref={ref} className={`arrival-film ${ready?'is-ready':''}`} src={src} muted playsInline preload="auto" poster={assetURL('/art/headquarters-poster.webp')} onLoadedData={()=>setReady(true)} onError={()=>{setFailed(true);onFailure?.();}} aria-hidden="true"/>;
}
