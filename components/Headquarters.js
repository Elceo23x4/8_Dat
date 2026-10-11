'use client';
import {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import ArrivalFilm from './ArrivalFilm';
const configuredFilm=process.env.NEXT_PUBLIC_ARRIVAL_VIDEO || '';
const filmSource=/^\/media\/[a-zA-Z0-9/_-]+\.(mp4|webm)$/.test(configuredFilm)?configuredFilm:'';

// Authored architectural geometry. No provider mesh, animation clip or paid API.
export default function Headquarters({progressRef,reduced}) {
 const host=useRef(null), live=useRef({pointer:0}), [failed,setFailed]=useState(false);
 useEffect(()=>{
  if(reduced||filmSource)return;
  const el=host.current; let renderer;
  try {const canvas=document.createElement('canvas');const context=canvas.getContext('webgl2',{antialias:true,alpha:true,powerPreference:'low-power'});if(!context){setFailed(true);return;}renderer=new THREE.WebGLRenderer({canvas,context,antialias:true,alpha:true,powerPreference:'low-power'});}catch{setFailed(true);return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.setClearColor('#e7e1d7',1); el.appendChild(renderer.domElement);
  const scene=new THREE.Scene(); scene.fog=new THREE.Fog('#e7e1d7',55,150);
  const camera=new THREE.PerspectiveCamera(43,1,.1,240);camera.position.set(0,14,44);camera.lookAt(-5,13,0);
  scene.add(new THREE.HemisphereLight('#fff6e6','#4e4036',3));
  const sun=new THREE.DirectionalLight('#ffedce',4);sun.position.set(-20,40,20);scene.add(sun);
  const tower=new THREE.Group();scene.add(tower);
  const materials={glass:new THREE.MeshStandardMaterial({color:'#577a78',metalness:.75,roughness:.19}),metal:new THREE.MeshStandardMaterial({color:'#242a28',metalness:.8,roughness:.35}),stone:new THREE.MeshStandardMaterial({color:'#b8afa2',roughness:.9}),white:new THREE.MeshStandardMaterial({color:'#eee5d7',roughness:.7}),teal:new THREE.MeshStandardMaterial({color:'#80cec5',emissive:'#47938a',emissiveIntensity:.25})};
  function box(parent,w,h,d,x,y,z,mat){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);parent.add(m);return m;}
  box(scene,180,.25,180,0,-.2,0,materials.stone);
  box(scene,16,.08,60,0,-.02,27,materials.white);
  for(let i=0;i<10;i++)box(scene,8,.01,.12,0,.04,10+i*3,materials.stone);
  // The lobby is a complete recess; facade surrounds a real entrance gap.
  box(tower,18,31,11,0,19.5,0,materials.glass);
  for(let y=5;y<=35;y+=1.5)box(tower,18.18,.08,11.18,0,y,0,materials.metal);
  for(let x=-9;x<=9;x+=1.5){box(tower,.08,31,11.2,x,19.5,0,materials.metal);}
  box(tower,6,4,11,-6,2,0,materials.glass);box(tower,6,4,11,6,2,0,materials.glass);
  box(tower,6,.2,11,0,4,0,materials.metal);box(tower,6,.15,11,0,.05,0,materials.white);
  box(tower,6,4,.15,0,2,-5.5,materials.white);box(tower,6,4,.12,0,2,-3,materials.teal);
  const doorL=box(tower,1.5,3.2,.12,-.78,1.65,5.6,materials.glass);
  const doorR=box(tower,1.5,3.2,.12,.78,1.65,5.6,materials.glass);
  box(tower,8,.18,3,0,4.1,6.2,materials.metal);
  // Real texture typography applied to architecture, independently from HTML logo.
  const label=document.createElement('canvas');label.width=512;label.height=160;const ctx=label.getContext('2d');
  ctx.fillStyle='#242a28';ctx.fillRect(0,0,512,160);ctx.fillStyle='#f6efdf';ctx.font='bold 105px Arial';ctx.textAlign='center';ctx.fillText('8 DAT',256,120);
  const tex=new THREE.CanvasTexture(label);tex.colorSpace=THREE.SRGBColorSpace;
  const signMat=new THREE.MeshBasicMaterial({map:tex});const sign=new THREE.Mesh(new THREE.PlaneGeometry(5,1.56),signMat);sign.position.set(0,5.5,5.62);tower.add(sign);
  // Secondary city rhythm, deterministic and restrained.
  for(let i=0;i<16;i++){const side=i%2?-1:1;const h=16+(i*7%25);const x=side*(20+(i%3)*9),z=-15-Math.floor(i/2)*15;box(scene,11,h,10,x,h/2,z,materials.glass);for(let y=2;y<h;y+=2)box(scene,11.1,.1,10.1,x,y,z,materials.metal);}
  for(const x of [-12,12]){box(scene,.12,5,.12,x,2.5,12,materials.metal);box(scene,1.4,.1,.5,x,5,12,materials.white);}
  let visible=true, disposed=false;
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;},{rootMargin:'100px'});observer.observe(el);
  const resize=()=>{const r=el.getBoundingClientRect();renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();};
  const ro=new ResizeObserver(resize);ro.observe(el);resize();
  const pointer=e=>{live.current.pointer=(e.clientX/window.innerWidth-.5)*2;};window.addEventListener('pointermove',pointer,{passive:true});
  const lose=e=>{e.preventDefault();setFailed(true);};renderer.domElement.addEventListener('webglcontextlost',lose);
  const target=new THREE.Vector3();
  renderer.setAnimationLoop(()=>{
   if(disposed||!visible||document.hidden)return;
   const p=progressRef.current;const orbit=Math.min(p/.62,1)*Math.PI*2;
   const approach=THREE.MathUtils.smoothstep(p,.64,1);const radius=THREE.MathUtils.lerp(44,3,approach);
   target.set(Math.sin(orbit)*radius+live.current.pointer*.7,THREE.MathUtils.lerp(14,2.2,approach),Math.cos(orbit)*radius);
   camera.position.lerp(target,.12);camera.lookAt(THREE.MathUtils.lerp(-5,0,Math.min(p*4,1)),THREE.MathUtils.lerp(13,2.1,approach),0);
   const open=THREE.MathUtils.smoothstep(p,.88,.98);doorL.position.x=-.78-open*1.45;doorR.position.x=.78+open*1.45;
   renderer.render(scene,camera);
  });
  return()=>{disposed=true;renderer.setAnimationLoop(null);observer.disconnect();ro.disconnect();window.removeEventListener('pointermove',pointer);renderer.domElement.removeEventListener('webglcontextlost',lose);scene.traverse(o=>{if(o.geometry)o.geometry.dispose();});Object.values(materials).forEach(m=>m.dispose());signMat.dispose();tex.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();};
 },[reduced,progressRef]);
 return <div className="architecture" aria-hidden="true"><img className="architectural-poster" src="/art/headquarters-poster.webp" alt=""/>{filmSource?<ArrivalFilm src={filmSource} progressRef={progressRef} reduced={reduced}/>:!reduced&&!failed&&<div className="webgl-host" ref={host}/>}</div>;
}
