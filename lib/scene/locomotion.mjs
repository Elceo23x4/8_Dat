// Distances are metres. A stance foot has one fixed arc-distance target.
export const WALK_STRIDE=1.12;
export function footPhase(distance, side, stride = WALK_STRIDE) {
  const offset=side===0?0:.5, cycles=distance/stride+offset;
  const cycle=Math.floor(cycles), phase=cycles-cycle;
  const anchor=(cycle-offset+.38)*stride;
  if(phase<.62)return {forward:anchor,height:0,contact:true,phase};
  const swing=(phase-.62)/.38, ease=swing*swing*(3-2*swing);
  return {forward:anchor+stride*ease,height:.13*Math.sin(Math.PI*swing),contact:false,phase};
}
export function smoothRange(value,start,end){const t=Math.max(0,Math.min(1,(value-start)/(end-start)));return t*t*(3-2*t);}
export function arrivalCamera(progress,aspect=1.5){
 const orbit=smoothRange(progress,.22,.69)*Math.PI*2;
 const rise=smoothRange(progress,.12,.26),enter=smoothRange(progress,.7,1);
 const radius=(32+28*rise)*(1-enter)+.65*enter;
 return {x:Math.sin(orbit)*radius,y:(4.5+14*rise)*(1-enter)+1.7*enter,z:Math.cos(orbit)*radius,
  lookY:(5.2+11*rise)*(1-enter)+1.7*enter, fov:aspect<.8?51:43,door:smoothRange(progress,.85,.94)};
}

export function consultantProgress(progress){return .61*smoothRange(progress,.06,.69)+.39*smoothRange(progress,.88,.99);}
export const CONSULTANT_PATH_POINTS=[[-9,0,18],[-4,0,15],[0,0,10],[0,0,5],[0,0,-2]];
