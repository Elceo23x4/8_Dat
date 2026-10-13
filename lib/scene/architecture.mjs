import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {SVGLoader} from 'three/addons/loaders/SVGLoader.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import lettering from '../../components/data/signage.json' with {type:'json'};

export function buildArchitecture(scene,materials){
 const box=new THREE.BoxGeometry(1,1,1),staticBatches=new Map();
 function block(w,h,d,x,y,z,mat){const m=new THREE.Mesh(box,mat);m.position.set(x,y,z);m.scale.set(w,h,d);m.updateMatrix();const list=staticBatches.get(mat)||[];list.push(m.matrix.clone());staticBatches.set(mat,list);return m;}
 function add(geometry,mat,x=0,y=0,z=0){const mesh=new THREE.Mesh(geometry,mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);return mesh;}
 const floor=add(new THREE.PlaneGeometry(220,220),materials.paving);floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;floor.castShadow=false;
 // Continuous curved/tapered loft: angular rings share vertices and a real silhouette.
 function profile(t,a){const rotation=t*.3;const rx=7.8*(1-.4*t),rz=5.4*(1-.22*t);return [Math.cos(a+rotation)*rx+Math.sin(t*Math.PI)*1.2,5.2+t*36,Math.sin(a+rotation)*rz];}
 const vertices=[],indices=[],segments=64,rows=24;
 for(let row=0;row<=rows;row++)for(let col=0;col<=segments;col++){const p=profile(row/rows,col/segments*Math.PI*2);if(row===rows)p[1]+=Math.cos(col/segments*Math.PI*2)*1.4;vertices.push(...p);}
 for(let y=0;y<rows;y++)for(let x=0;x<segments;x++){const a=y*(segments+1)+x,b=a+segments+1;indices.push(a,b,a+1,b,b+1,a+1);}
 const glass=new THREE.BufferGeometry();glass.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));glass.setIndex(indices);glass.computeVertexNormals();add(glass,materials.glass);
 for(let i=0;i<28;i++){
  const points=Array.from({length:19},(_,j)=>new THREE.Vector3(...profile(j/18,i/28*Math.PI*2)));
  add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),24,.045,5,false),i%7===0?materials.gold:materials.aluminum);
 }
 for(let level=0;level<23;level++){
  const t=level/22,y=5.2+t*36,rx=7.8*(1-.4*t),rz=5.4*(1-.22*t);
  const band=add(new THREE.TorusGeometry(1,level%4===0?.022:.006,5,64),level%4===0?materials.white:materials.aluminum,Math.sin(t*Math.PI)*1.2,y,0);
  band.rotation.x=Math.PI/2;band.rotation.z=t*.3;band.scale.set(rx,rz,1);
  if(level>0&&level%4===0){const terrace=add(new THREE.CylinderGeometry(rx+.6,rx+.6,.22,64),materials.white,Math.sin(t*Math.PI)*1.2,y,0);terrace.scale.z=rz/rx;terrace.rotation.y=-t*.3;}
 }
 // Swept white crown wings, aluminum underlay and a deliberately split top.
 for(const side of [-1,1]){const pts=Array.from({length:22},(_,i)=>{const t=i/21;return new THREE.Vector3(side*(7.6-4*t+Math.sin(t*Math.PI)*.7),4.8+t*39,-1.4+Math.sin(t*Math.PI)*2.2);});const wing=add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),40,.26,8,false),materials.white);wing.scale.z=1.8;}
 // Front lobby is physically open. Curved wings flank the portal rather than covering it.
 for(const side of [-1,1]){const panel=add(new RoundedBoxGeometry(5.2,4.9,6.2,3,.3),materials.glass,side*5,2.45,0);panel.rotation.y=side*.08;block(.18,4.8,.18,side*2.25,2.4,5.55,materials.aluminum);}
 const canopy=add(new THREE.CylinderGeometry(10,9.7,.24,64),materials.gold,0,5.05,2.2);canopy.scale.z=.72;
 block(5,.1,7.5,0,.01,1.8,materials.lobbyFloor);
 block(5,4.9,.16,0,2.45,-3.4,materials.walnut);
 block(4.1,.035,.04,0,4.85,5.55,materials.light);
 block(.08,4.8,.1,-2.1,2.4,5.6,materials.gold);block(.08,4.8,.1,2.1,2.4,5.6,materials.gold);
 add(new RoundedBoxGeometry(2.7,.95,1,3,.14),materials.walnut,0,.5,-1.2);
 block(2.5,.035,.05,0,1,-.65,materials.light);
 for(const x of [-1.8,1.8])block(.055,4.2,.1,x,2.1,5.66,materials.aluminum);
 block(3.7,.1,.1,0,4.2,5.66,materials.aluminum);
 const doors=[-1,1].map(side=>{const group=new THREE.Group();scene.add(group);group.position.set(side*.9,0,5.72);const pane=new THREE.Mesh(new THREE.BoxGeometry(1.77,4.08,.055),materials.doorGlass);pane.position.y=2.09;group.add(pane);for(const x of [-.89,.89]){const rail=new THREE.Mesh(new THREE.BoxGeometry(.025,4.15,.06),materials.aluminum);rail.position.set(x,2.08,0);group.add(rail);}const handle=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.6,8),materials.gold);handle.position.set(-side*.72,1.8,.06);group.add(handle);return group;});
 const sign=new THREE.Group();scene.add(sign);sign.position.set(-2.25,4.43,6.1);
 const parsed=new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg">${lettering.paths.filter(Boolean).map(d=>`<path d="${d}"/>`).join('')}</svg>`);
 const scale=4.5/lettering.width;
 for(const path of parsed.paths)for(const shape of SVGLoader.createShapes(path)){const geometry=new THREE.ExtrudeGeometry(shape,{depth:38,bevelEnabled:true,bevelThickness:6,bevelSize:5,bevelSegments:2,curveSegments:8});geometry.scale(scale,scale,scale);const letter=new THREE.Mesh(geometry,materials.gold);letter.castShadow=true;sign.add(letter);}
 // Reflective surroundings remain beyond the full camera orbit.
 for(let i=0;i<12;i++){const angle=i/12*Math.PI*2,x=Math.cos(angle)*86,z=Math.sin(angle)*86,height=19+(i*7%22),r=6+(i%3);const tower=add(new THREE.CylinderGeometry(r*.7,r,height,24),i%3===0?materials.white:materials.glass,x,height/2,z);tower.scale.z=.65;for(let floor=3;floor<height;floor+=3){const ring=add(new THREE.TorusGeometry(r,.065,4,24),materials.aluminum,x,floor,z);ring.rotation.x=Math.PI/2;ring.scale.y=.65;}}
 const arch=add(new THREE.TorusGeometry(18,1.3,12,48,Math.PI),materials.white,-55,0,-57);arch.rotation.z=0;
 for(let i=0;i<16;i++){const x=(i%2?1:-1)*(13+Math.floor(i/2)*2.4),z=10-Math.floor(i/2)*3;block(1.8,.6,1.5,x,.3,z,materials.walnut);const trunk=add(new THREE.CylinderGeometry(.065,.12,2.2,8),materials.bark,x,1.6,z);const leaves=add(new THREE.IcosahedronGeometry(1,1),materials.leaves,x,2.9,z);leaves.scale.set(.85,1.1,.8);trunk.castShadow=leaves.castShadow=true;}
 for(const x of [-6,6])for(let i=0;i<4;i++){block(.085,.72,.085,x,.36,10+i*4,materials.gold);block(.12,.025,.12,x,.74,10+i*4,materials.light);}
 for(const [material,matrices] of staticBatches){const batch=new THREE.InstancedMesh(box,material,matrices.length);matrices.forEach((m,i)=>batch.setMatrixAt(i,m));batch.castShadow=true;batch.receiveShadow=true;batch.computeBoundingSphere();scene.add(batch);}
 // Merge static authored surfaces per material; door leaves remain independent.
 scene.updateMatrixWorld(true);const grouped=new Map();
 scene.traverse(mesh=>{if(!mesh.isMesh||mesh.isInstancedMesh||doors.some(d=>mesh.parent===d))return;const list=grouped.get(mesh.material)||[];list.push(mesh);grouped.set(mesh.material,list);});
 for(const [material,meshes] of grouped){if(meshes.length<2)continue;const geometry=meshes.map(mesh=>{let g=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry.clone();if(!g.attributes.uv)g.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2),2));g.applyMatrix4(mesh.matrixWorld);return g;});const merged=mergeGeometries(geometry);if(!merged){geometry.forEach(g=>g.dispose());continue;}const batch=new THREE.Mesh(merged,material);batch.castShadow=meshes.some(m=>m.castShadow);batch.receiveShadow=meshes.some(m=>m.receiveShadow);scene.add(batch);meshes.forEach(m=>{m.parent.remove(m);m.geometry.dispose();});geometry.forEach(g=>g.dispose());}
 return {doors,box};
}
