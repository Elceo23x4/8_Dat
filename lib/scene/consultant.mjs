import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {footPhase,WALK_STRIDE} from './locomotion.mjs';

export function createConsultant(scene, materials){
 const root=new THREE.Group();root.name='Consultant';scene.add(root);
 const suit=materials.suit,skin=materials.skin,leather=materials.leather;
 const sphere=new THREE.SphereGeometry(1,20,14);
 const tube=new THREE.CylinderGeometry(1,1,1,16,1);
 function oval(parent,x,y,z,sx,sy,sz,mat){const m=new THREE.Mesh(sphere,mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;parent.add(m);return m;}
 function rounded(parent,w,h,d,x,y,z,mat,r=.03){const m=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,2,r),mat);m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
 function panel(points,mat){const shape=new THREE.Shape();points.forEach(([x,y],i)=>i?shape.lineTo(x,y):shape.moveTo(x,y));const m=new THREE.Mesh(new THREE.ShapeGeometry(shape),mat);m.position.z=.132;root.add(m);return m;}
 // A tailored torso with shoulder/waist shaping rather than a capsule silhouette.
 const outline=[new THREE.Vector2(.16,.94),new THREE.Vector2(.17,1.04),new THREE.Vector2(.155,1.2),new THREE.Vector2(.225,1.4),new THREE.Vector2(.12,1.49)];
 const torso=new THREE.Mesh(new THREE.LatheGeometry(outline,32),suit);torso.scale.z=.58;torso.castShadow=true;root.add(torso);
 rounded(root,.15,.33,.012,0,1.32,.138,materials.shirt,.008);
 panel([[-.105,1.48],[-.02,1.35],[-.09,1.21],[-.16,1.42]],materials.lapel);
 panel([[.105,1.48],[.02,1.35],[.09,1.21],[.16,1.42]],materials.lapel);
 panel([[0,1.4],[-.019,1.34],[-.026,1.2],[0,1.17],[.026,1.2],[.019,1.34]],materials.tie).position.z=.153;
 for(const y of [1.16,1.06])oval(root,.032,y,.146,.008,.008,.005,materials.buttons);
 oval(root,0,1.49,0,.057,.085,.052,skin);
 const head=new THREE.Group();head.position.set(0,1.675,0);root.add(head);
 const profile=[new THREE.Vector2(.028,-.12),new THREE.Vector2(.061,-.09),new THREE.Vector2(.087,-.042),new THREE.Vector2(.097,.045),new THREE.Vector2(.087,.1),new THREE.Vector2(.052,.132),new THREE.Vector2(0,.145)];
 const skull=new THREE.Mesh(new THREE.LatheGeometry(profile,32),skin);skull.scale.z=.87;head.add(skull);skull.castShadow=true;
 for(const side of [-1,1]){
  oval(head,side*.098,-.005,0,.016,.035,.019,skin);
  oval(head,side*.034,.025,.079,.016,.009,.009,materials.eye);
  oval(head,side*.034,.025,.087,.006,.006,.003,materials.iris);
  rounded(head,.028,.004,.005,side*.035,.047,.079,materials.hair,.001);
 }
 oval(head,0,-.006,.085,.016,.036,.02,skin);
 oval(head,0,-.067,.071,.032,.004,.005,materials.lips);
 const hair=new THREE.Mesh(new THREE.SphereGeometry(1,24,16,0,Math.PI*2,0,Math.PI*.51),materials.hair);hair.scale.set(.098,.098,.087);hair.position.y=.045;head.add(hair);
 const hips=[new THREE.Vector3(-.1,.96,0),new THREE.Vector3(.1,.96,0)];
 const legs=hips.map((hip,i)=>{
  const upper=new THREE.Mesh(tube,suit),lower=new THREE.Mesh(tube,suit);root.add(upper,lower);upper.castShadow=lower.castShadow=true;
  const knee=oval(root,0,0,0,.065,.063,.065,suit);
  const shoe=rounded(root,.115,.095,.27,0,0,0,leather,.035);
  const sole=rounded(root,.119,.015,.28,0,0,0,materials.sole,.006);
  return {hip,upper,lower,knee,shoe,sole,side:i};
 });
 const arms=[-1,1].map(side=>{
  const shoulder=new THREE.Vector3(side*.215,1.39,0);
  const upper=new THREE.Mesh(tube,suit),lower=new THREE.Mesh(tube,suit);root.add(upper,lower);upper.castShadow=lower.castShadow=true;
  const hand=oval(root,0,0,0,.035,.072,.027,skin);
  const cuff=rounded(root,.073,.045,.064,0,0,0,materials.shirt,.01);
  return {side,shoulder,upper,lower,hand,cuff};
 });
 const bag=rounded(root,.36,.25,.085,.32,.69,0,leather,.02);
 const handle=new THREE.Mesh(new THREE.TorusGeometry(.045,.008,8,20,Math.PI),leather);bag.add(handle);handle.position.y=.125;
 const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-9,0,18),new THREE.Vector3(-4,0,15),new THREE.Vector3(0,0,10),new THREE.Vector3(0,0,5),new THREE.Vector3(0,0,-2)]);
 const length=curve.getLength(), up=new THREE.Vector3(0,1,0), tmp=new THREE.Vector3();
 function segment(mesh,a,b,radius){tmp.copy(b).sub(a);mesh.position.copy(a).addScaledVector(tmp,.5);mesh.quaternion.setFromUnitVectors(up,tmp.clone().normalize());mesh.scale.set(radius,tmp.length(),radius);}
 const ankleWorld=new THREE.Vector3();
 function update(fraction){
  const distance=Math.max(0,Math.min(1,fraction))*length;
  const pos=curve.getPointAt(distance/length), tangent=curve.getTangentAt(distance/length);
  root.position.copy(pos);root.rotation.y=Math.atan2(tangent.x,tangent.z);
  const yaw=root.rotation.y,cos=Math.cos(yaw),sin=Math.sin(yaw);
  const bob=.015*Math.sin(distance/WALK_STRIDE*Math.PI*2)**2;
  torso.position.y=bob;head.position.y=1.675+bob;
  for(const leg of legs){
   const gait=footPhase(distance,leg.side),d=Math.max(0,Math.min(length,gait.forward));
   const p=curve.getPointAt(d/length),t=curve.getTangentAt(d/length),side=leg.side===0?-.105:.105;
   ankleWorld.set(p.x+t.z*side,gait.height+.105,p.z-t.x*side);
   const dx=ankleWorld.x-pos.x,dz=ankleWorld.z-pos.z;
   const ankle=new THREE.Vector3(cos*dx-sin*dz,ankleWorld.y,sin*dx+cos*dz);
   const hip=leg.hip.clone();hip.y+=bob;
   const axis=ankle.clone().sub(hip),reach=Math.min(axis.length(),.995);axis.normalize();
   const bend=new THREE.Vector3(0,0,1).addScaledVector(axis,-axis.z).normalize();
   const knee=hip.clone().addScaledVector(axis,reach*.5).addScaledVector(bend,Math.sqrt(Math.max(0,.505**2-(reach*.5)**2)));
   segment(leg.upper,hip,knee,.077);segment(leg.lower,knee,ankle,.056);leg.knee.position.copy(knee);
   const footYaw=Math.atan2(t.x,t.z)-yaw;
   leg.shoe.position.copy(ankle).add(new THREE.Vector3(Math.sin(footYaw)*.055,-.055,Math.cos(footYaw)*.055));leg.sole.position.copy(leg.shoe.position).y-=.043;leg.shoe.rotation.y=leg.sole.rotation.y=footYaw;
  }
  arms.forEach(arm=>{
   const swing=Math.sin(distance/WALK_STRIDE*Math.PI*2+(arm.side>0?Math.PI:0))*.1;
   const elbow=new THREE.Vector3(arm.side*.27,1.12,swing);
   const wrist=new THREE.Vector3(arm.side*.29,.88,swing*.6);
   segment(arm.upper,arm.shoulder,elbow,.061);segment(arm.lower,elbow,wrist,.045);arm.hand.position.copy(wrist).y-=.052;arm.cuff.position.copy(wrist);if(arm.side>0){bag.position.z=wrist.z;bag.position.y=wrist.y-.2;}
  });
 }
 update(0);
 return {root,update,geometry:[sphere,tube],length};
}
