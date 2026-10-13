import {test} from 'node:test';
import assert from 'node:assert/strict';
import {footPhase,WALK_STRIDE,arrivalCamera} from '../lib/scene/locomotion.mjs';
test('a stance foot stays at a fixed world-distance target as the body advances',()=>{const first=footPhase(.08,0),next=footPhase(.22,0);assert.equal(first.contact,true);assert.equal(next.contact,true);assert.equal(first.forward,next.forward);assert.equal(first.height,0);assert.equal(next.height,0);});
test('the swing clears the floor and returns to the next planted target continuously',()=>{const lift=footPhase(WALK_STRIDE*.8,0),land=footPhase(WALK_STRIDE,0),before=footPhase(WALK_STRIDE*.99999,0);assert.equal(lift.contact,false);assert.ok(lift.height>.1);assert.equal(land.contact,true);assert.equal(land.height,0);assert.ok(Math.abs(before.forward-land.forward)<.0001);assert.ok(before.height<.0001);});
test('the portal opens before the camera crosses the threshold',()=>{for(const p of [.94,.96,.98,1]){const camera=arrivalCamera(p);if(camera.z<5.72)assert.ok(camera.door>.95);}assert.equal(arrivalCamera(1).y,1.7);assert.ok(arrivalCamera(1).z<1);});
