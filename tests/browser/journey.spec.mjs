import {test,expect} from '@playwright/test';
import {existsSync} from 'node:fs';
const productionFilm=existsSync('public/media/arrival-with-consultant.mp4')||existsSync('public/media/arrival.mp4')||existsSync('public/media/arrival.webm');
for(const [name,width,height,reduced] of [['desktop',1440,1000,false],['mobile',390,844,false],['small reduced',320,740,true]]){
 test(`${name}: journey, assets and WhatsApp handoff`,async({page},testInfo)=>{
  await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:reduced?'reduce':'no-preference'});
  const errors=[],failedAssets=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:3001')&&r.status()>=400)failedAssets.push(`${r.status()} ${r.url()}`);});
  await page.goto('./');await expect(page.locator('h1')).toBeVisible();await page.waitForTimeout(1000);
  if(!reduced&&process.env.BROWSER_FALLBACK!=='1'){
   if(productionFilm){await expect(page.locator('video')).toHaveClass(/is-ready/);}else{await expect(page.locator('.webgl-host canvas')).toBeVisible();expect(await page.locator('canvas').evaluate(el=>!!el.getContext('webgl2'))).toBe(true);}
  }
  await page.screenshot({path:testInfo.outputPath('arrival.png')});
  if(name==='desktop'){for(const progress of [.25,.5,.62,.88,.98]){await page.locator('.arrival').evaluate((el,p)=>window.scrollTo({top:(el.offsetHeight-innerHeight)*p,behavior:'instant'}),progress);await page.waitForTimeout(900);await page.screenshot({path:testInfo.outputPath(`arrival-${progress}.png`)});}}
  for(const selector of ['#investigation','#workflow','#work','.delivery','#skills','.marketing','#contact']){
   const el=page.locator(selector);await el.evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY,behavior:'instant'}));await page.waitForTimeout(750);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),selector+' overflow').toBe(true);
   await page.screenshot({path:testInfo.outputPath(`${selector.replace(/[.#]/g,'')}.png`)});
  }
  const gallery=page.locator('#work');const pinned=await gallery.evaluate(el=>el.parentElement.classList.contains('pin-spacer'));
  if(pinned){await gallery.evaluate(el=>window.scrollTo({top:el.parentElement.offsetTop+el.parentElement.offsetHeight-innerHeight,behavior:'instant'}));await page.waitForTimeout(850);}else{await page.locator('.work-rail').evaluate(el=>el.scrollLeft=el.scrollWidth);}
  await expect(page.locator('.rail-controls [aria-live]')).toHaveText('5 / 5');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.locator('[name=name]').fill('Ada Okafor');await page.locator('[name=business]').fill('A&B Studio');await page.locator('[name=email]').fill('ada@example.com');await page.locator('[name=message]').fill('A launch with + signs & a new website.');
  expect(await page.getByRole('link',{name:'Instagram ↗'}).getAttribute('href')).toBe('https://www.instagram.com/8dat_work/');
  expect(failedAssets).toEqual([]);expect(errors).toEqual([]);
  let handoff;await page.route('https://wa.me/**',route=>{handoff=new URL(route.request().url());return route.abort();});
  await page.getByRole('button',{name:'Continue to WhatsApp'}).click();await expect.poll(()=>handoff?.pathname).toBe('/2349115716254');
  expect(handoff.searchParams.get('text')).toContain('Business: A&B Studio');expect(handoff.searchParams.get('text')).toContain('A launch with + signs & a new website.');
 });
}
