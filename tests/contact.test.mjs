import {test} from 'node:test';
import assert from 'node:assert/strict';
import {whatsappURL,safeSocialURL} from '../lib/contact.mjs';
const brief = {name:' Ada ',business:'A&B',email:'ada@example.com',service:'Brand & identity',message:'A launch\nwith + signs & details'};
test('WhatsApp uses international recipient and preserves full brief',()=>{
 const url = new URL(whatsappURL('+234 (801) 234-5678',brief));
 assert.equal(url.pathname,'/2348012345678');
 assert.match(url.searchParams.get('text'),/Business: A&B/);
 assert.match(url.searchParams.get('text'),/A launch\nwith \+ signs & details/);
});
test('unconfigured and invalid recipients cannot send',()=>{for(const n of ['', '123', 'number', '01234567890', '2348012345678?x']) assert.equal(whatsappURL(n,brief),null);});
test('social configuration accepts HTTPS only',()=>{assert.equal(safeSocialURL('javascript:alert(1)'),null);assert.equal(safeSocialURL(''),null);assert.equal(safeSocialURL('https://instagram.com/example'),'https://instagram.com/example');});
