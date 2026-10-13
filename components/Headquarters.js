'use client';
import {useEffect,useRef,useState,useCallback} from 'react';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {assetURL} from '../lib/assets.mjs';
import {arrivalCamera,smoothRange,consultantProgress} from '../lib/scene/locomotion.mjs';
import {createConsultant} from '../lib/scene/consultant.mjs';
import {buildArchitecture} from '../lib/scene/architecture.mjs';
import ArrivalFilm from './ArrivalFilm';
const configuredFilm=process.env.NEXT_PUBLIC_ARRIVAL_VIDEO||'';
const filmIncludesConsultant=process.env.NEXT_PUBLIC_FILM_INCLUDES_CONSULTANT==='true';
const filmSource=/^\/media\/[a-zA-Z0-9/_-]+\.(mp4|webm)$/.test(configuredFilm)?configuredFilm:'';

function surfaceTexture(kind){
 const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const c=canvas.getContext('2d');
 c.fillStyle=kind==='paving'?'#766153':'#b8b0a2';c.fillRect(0,0,256,256);
 let seed=31;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
 for(let i=0;i<9000;i++){const tone=Math.floor(70+random()*150);c.fillStyle=`rgba(${tone},${tone},${tone},${random()*.16})`;c.fillRect(random()*256,random()*256,1,kind==='cloth'?4:1);}
 if(kind==='paving'){c.strokeStyle='#2c221b';c.lineWidth=1;for(const y of [0,128,256]){c.beginPath();c.moveTo(0,y);c.lineTo(256,y);c.stroke();}for(const [x,y] of [[128,0],[64,128],[256,128]]){c.beginPath();c.moveTo(x,y);c.lineTo(x,y+128);c.stroke();}}
 const texture=new THREE.CanvasTexture(canvas);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(kind==='paving'?120:3,kind==='paving'?120:3);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}

export default function Headquarters({progressRef,reduced}){
 const host=useRef(null),pointer=useRef(0),[failed,setFailed]=useState(false),[filmFailed,setFilmFailed]=useState(false);
 const onFilmFailure=useCallback(()=>setFilmFailed(true),[]);
 useEffect(()=>{
  if(reduced||failed||(filmSource&&!filmFailed&&filmIncludesConsultant))return;
  const architectureFilm=!!filmSource&&!filmFailed&&!filmIncludesConsultant;
  const el=host.current;if(!el)return;let renderer;
  try{const canvas=document.createElement('canvas');const context=canvas.getContext('webgl2',{antialias:true,alpha:true});if(!context){setFailed(true);return;}renderer=new THREE.WebGLRenderer({canvas,context,antialias:true,alpha:true});}catch{setFailed(true);return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.4;
  renderer.setClearColor('#211713',architectureFilm?0:1);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;el.appendChild(renderer.domElement);
  const scene=new THREE.Scene();scene.fog=new THREE.Fog('#211713',75,190);
  const room=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer),environment=pmrem.fromScene(room,.035);scene.environment=environment.texture;room.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight('#fff4de','#39251b',2.3));
  const sun=new THREE.DirectionalLight('#ffdfa3',4.5);sun.position.set(-18,35,25);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-24,right:24,top:45,bottom:-12,near:.5,far:100});sun.shadow.bias=-.0003;scene.add(sun);
  const fill=new THREE.DirectionalLight('#d5e4e1',1.1);fill.position.set(14,8,-20);scene.add(fill);
  const paving=surfaceTexture('paving'),cloth=surfaceTexture('cloth');
  const standard=(color,roughness=.5,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
  const materials={
   glass:new THREE.MeshPhysicalMaterial({color:'#293d3b',metalness:.68,roughness:.16,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:1.7}),
   doorGlass:new THREE.MeshPhysicalMaterial({color:'#bac5bd',transparent:true,opacity:.27,metalness:.3,roughness:.06,clearcoat:1,side:THREE.DoubleSide,depthWrite:false}),
   aluminum:standard('#b6b6aa',.27,.9),white:standard('#dfdacd',.36,.2),gold:standard('#aa8850',.3,.88),
   walnut:standard('#39231b',.64),paving:new THREE.MeshStandardMaterial({color:'#4b3528',map:paving,roughness:.35,metalness:.18}),lobbyFloor:standard('#b8aa8e',.23,.25),
   light:new THREE.MeshStandardMaterial({color:'#efc783',emissive:'#f4c875',emissiveIntensity:2}),bark:standard('#4e3724',.9),leaves:standard('#27392b',.85),
   suit:new THREE.MeshStandardMaterial({color:'#34251e',roughness:.85,bumpMap:cloth,bumpScale:.015}),lapel:standard('#211b16',.75),shirt:standard('#d9d2bd',.95),tie:standard('#94774a',.8),
   skin:standard('#875b3f',.56),lips:standard('#684434',.65),hair:standard('#1b1713',.94),eye:standard('#d9cbb7',.4),iris:standard('#211915',.3),leather:standard('#211913',.33),sole:standard('#17120f',.88),buttons:standard('#8b7654',.3,.7)
  };
  const lighting=new Set(scene.children);
  const architecture=buildArchitecture(scene,materials);
  if(architectureFilm){scene.children.filter(node=>!lighting.has(node)).forEach(node=>{node.visible=false;});scene.fog=null;const shadow=new THREE.Mesh(new THREE.PlaneGeometry(100,100),new THREE.ShadowMaterial({opacity:.25}));shadow.rotation.x=-Math.PI/2;shadow.receiveShadow=true;scene.add(shadow);materials.filmShadow=shadow.material;}
  const consultant=createConsultant(scene,materials);
  // Architecture includes two door groups named below by returned handles.
  const doorGroups=architecture.doors;
  const camera=new THREE.PerspectiveCamera(43,1,.05,260);
  let visible=true,dirty=true,lastProgress=-1,lastPointer=null,disposed=false;
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(el);
  const resize=()=>{dirty=true;const r=el.getBoundingClientRect();renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();};const ro=new ResizeObserver(resize);ro.observe(el);resize();
  const move=e=>{pointer.current=(e.clientX/innerWidth-.5)*2;};window.addEventListener('pointermove',move,{passive:true});
  const lose=e=>{e.preventDefault();setFailed(true);};renderer.domElement.addEventListener('webglcontextlost',lose);
  renderer.setAnimationLoop(()=>{
   if(!visible||document.hidden||disposed)return;
   const p=progressRef.current;if(!dirty&&Math.abs(p-lastProgress)<.00001&&pointer.current===lastPointer)return;
   dirty=false;lastProgress=p;lastPointer=pointer.current;
   el.style.opacity=architectureFilm?1:smoothRange(p,.035,.12);
   const rig=arrivalCamera(p,camera.aspect);camera.fov=rig.fov;camera.updateProjectionMatrix();camera.position.set(rig.x+pointer.current*.35,rig.y,rig.z);camera.lookAt(0,rig.lookY,0);
   consultant.update(consultantProgress(p));consultant.root.visible=p<.99;
   doorGroups.forEach((door,i)=>{const side=i===0?-1:1;door.position.x=side*(.9+rig.door*1.72);});
   renderer.render(scene,camera);
  });
  return()=>{disposed=true;renderer.setAnimationLoop(null);observer.disconnect();ro.disconnect();window.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('webglcontextlost',lose);const geometries=new Set(),textures=new Set([paving,cloth]);scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);});geometries.forEach(g=>g.dispose());Object.values(materials).forEach(m=>m.dispose());textures.forEach(t=>t.dispose());environment.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();};
 },[reduced,failed,filmFailed,progressRef]);
 return <div className="architecture" aria-hidden="true"><img className="architectural-poster" src={assetURL('/art/headquarters-artistic.webp')} alt=""/>{filmSource&&!filmFailed?<ArrivalFilm src={assetURL(filmSource)} progressRef={progressRef} reduced={reduced} onFailure={onFilmFailure}/>:null}{!reduced&&!failed&&(!filmSource||filmFailed||!filmIncludesConsultant)?<div className="webgl-host" ref={host}/>:null}</div>;
}
