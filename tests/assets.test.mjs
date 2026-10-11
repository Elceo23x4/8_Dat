import {test} from 'node:test';
import assert from 'node:assert/strict';
import {assetURL} from '../lib/assets.mjs';
test('assets resolve on root and project Pages hosts',()=>{assert.equal(assetURL('/art/poster.webp',''),'/art/poster.webp');assert.equal(assetURL('/art/poster.webp','/8_Dat'),'/8_Dat/art/poster.webp');assert.equal(assetURL('/media/arrival.mp4','/8_Dat/'),'/8_Dat/media/arrival.mp4');assert.throws(()=>assetURL('//example.com/image'));});
