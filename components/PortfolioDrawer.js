'use client';
import {useRef,useState} from 'react';
import {assetURL} from '../lib/assets.mjs';
const files=[
 {name:'Liahona Geoservices',tab:'Liahona',src:'liahona-hero.webp',alt:'Liahona Geoservices website hero with surveying and construction imagery.'},
 {name:'Land & property',tab:'Land',src:'liahona-land.webp',alt:'Land sales service page with a detailed exploded surveying instrument.'},
 {name:'Custom GIS',tab:'GIS',src:'liahona-gis.webp',alt:'Custom GIS applications page with layered instrument components.'},
 {name:'Field services',tab:'Field',src:'liahona-footer.webp',alt:'Liahona project footer with excavator, earth textures and physical signposts.'}
];
export default function PortfolioDrawer(){
 const [active,setActive]=useState(null),[opened,setOpened]=useState(null),dialog=useRef(null);
 function open(file){setOpened(file);dialog.current.showModal();}
 return <section className="portfolio-drawer scroll-scene" id="portfolio" aria-label="Selected portfolio"><div className="scene-stage archive-stage"><h2 className="sr-only">Selected portfolio</h2><div className="archive-room"><div className="room-floor"/><div className="room-backwall"/><div className="drawer-cabinet"><div className="cabinet-shell"/><div className="drawer-moving"><div className="drawer-bottom"/><div className="drawer-side drawer-side-left"/><div className="drawer-side drawer-side-right"/><div className="drawer-front"><i className="drawer-screw screw-left"/><i className="drawer-screw screw-right"/><div className="drawer-handle"><i/><i/></div></div></div></div><div className="file-deck">{files.map((file,i)=><div className="folder-entry" key={file.src} style={{'--file-index':i,zIndex:active===i?20:files.length-i}} onPointerEnter={()=>setActive(i)} onPointerLeave={()=>setActive(null)}><div role="button" tabIndex="0" onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(file);}}} className={`file-folder ${active===i?'is-active':''}`} onFocus={()=>setActive(i)} onBlur={()=>setActive(null)} onClick={()=>open(file)} aria-label={`Open portfolio file: ${file.name}`}><span className="folder-tab" style={{right:`${24+i*82}px`}}>{file.tab}</span><span className="catalog-clip"/><img src={assetURL(`/art/${file.src}`)} alt={file.alt} loading="lazy"/><span className="folder-caption">{file.name}</span></div></div>)}</div></div></div><dialog className="portfolio-dialog" ref={dialog} onClick={e=>{if(e.target===dialog.current)dialog.current.close();}}><button className="close-file" onClick={()=>dialog.current.close()} aria-label="Close portfolio file">×</button>{opened?<><h3>{opened.name}</h3><img src={assetURL(`/art/${opened.src}`)} alt={opened.alt}/></>:null}</dialog></section>;
}
