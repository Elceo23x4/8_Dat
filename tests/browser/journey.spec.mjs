import {test,expect} from '@playwright/test';
import {existsSync} from 'node:fs';
const productionFilm=existsSync('public/media/arrival-with-consultant.mp4')||existsSync('public/media/arrival.mp4')||existsSync('public/media/arrival.webm');
for(const [name,width,height,reduced] of [['desktop',1440,1000,false],['mobile',390,844,false],['small reduced',320,740,true]]){
 test(`${name}: tactile journey and real WhatsApp handoff`,async({page},testInfo)=>{
  await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:reduced?'reduce':'no-preference'});
  const errors=[],failedAssets=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:3001')&&r.status()>=400)failedAssets.push(`${r.status()} ${r.url()}`);});
  await page.goto('./');await expect(page.locator('h1')).toBeVisible();await page.waitForTimeout(1000);
  await expect(page.getByText('Come inside. See what changes.')).toHaveCount(0);await expect(page.locator('.chapter,.step-number,.work-ticket,.section-note,.hero-caption,.video-label')).toHaveCount(0);
  if(!reduced&&process.env.BROWSER_FALLBACK!=='1'){if(productionFilm)await expect(page.locator('video')).toHaveClass(/is-ready/);else await expect(page.locator('.webgl-host canvas')).toBeVisible();}
  await page.screenshot({path:testInfo.outputPath('arrival.png')});
  if(name==='desktop')for(const progress of [.15,.4,.69,.9,.98]){await page.locator('.arrival').evaluate((el,p)=>window.scrollTo({top:(el.offsetHeight-innerHeight)*p,behavior:'instant'}),progress);await page.waitForTimeout(900);await page.screenshot({path:testInfo.outputPath(`arrival-${progress}.png`)});}
  for(const selector of ['#investigation','#workflow','#work','.delivery','#skills','#portfolio','.marketing','#contact']){
   await page.locator(selector).evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY,behavior:'instant'}));await page.waitForTimeout(650);
   const fits=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1);if(!fits)console.log(await page.locator('body *').evaluateAll(nodes=>nodes.map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName,class:el.className,right:r.right,left:r.left,width:r.width};}).filter(r=>r.right>innerWidth+1&&r.width>0).slice(-18)));
   expect(fits,selector+' page overflow').toBe(true);
   await page.screenshot({path:testInfo.outputPath(`${selector.replace(/[.#]/g,'')}.png`)});
  }
  if(!reduced){await page.locator('#investigation').evaluate(el=>window.scrollTo({top:el.offsetTop+(el.offsetHeight-innerHeight)*.99,behavior:'instant'}));await page.waitForTimeout(600);const glyphs=await page.locator('.writing-glyph').evaluateAll(paths=>paths.map(p=>parseFloat(getComputedStyle(p).fillOpacity)));expect(glyphs.every(x=>x>.95)).toBe(true);await page.screenshot({path:testInfo.outputPath('written-requirements.png')});}
  await page.locator('#workflow').evaluate(el=>window.scrollTo({top:el.offsetTop+(el.offsetHeight-innerHeight)*.48,behavior:'instant'}));await page.waitForTimeout(600);
  await page.getByRole('button',{name:/Confirm Agree what happens next/}).hover();await expect(page.locator('.process-popover')).toBeVisible();
  const bound=await page.locator('.process-popover').evaluate(el=>{const p=el.closest('.workflow-paper').getBoundingClientRect(),r=el.getBoundingClientRect();return r.left>=p.left-1&&r.right<=p.right+1&&r.top>=p.top-1&&r.bottom<=p.bottom+1;});expect(bound).toBe(true);await page.screenshot({path:testInfo.outputPath('process-detail.png')});
  const gallery=page.locator('#work');const pinned=await gallery.evaluate(el=>el.parentElement.classList.contains('pin-spacer'));if(pinned)await gallery.evaluate(el=>window.scrollTo({top:el.parentElement.offsetTop+el.parentElement.offsetHeight-innerHeight,behavior:'instant'}));else await page.locator('.work-rail').evaluate(el=>el.scrollLeft=el.scrollWidth);await expect(page.getByRole('button',{name:'Next concept'})).toBeDisabled();
  await page.locator('#portfolio').evaluate(el=>window.scrollTo({top:el.offsetTop+(el.offsetHeight-innerHeight)*.95,behavior:'instant'}));await page.waitForTimeout(700);await page.screenshot({path:testInfo.outputPath('portfolio-open.png')});
  const tabs=page.locator('.folder-tab');for(let i=0;i<(reduced?0:4);i++){await expect(tabs.nth(i)).toBeVisible();const box=await tabs.nth(i).boundingBox();expect(box.y).toBeGreaterThan(97);}
  await page.getByRole('button',{name:'Open portfolio file: Custom GIS'}).focus();await page.keyboard.press('Enter');await expect(page.locator('dialog h3')).toHaveText('Custom GIS');await page.keyboard.press('Escape');await expect(page.locator('dialog')).not.toBeVisible();
  await page.getByRole('button',{name:reduced?'Open portfolio file: Liahona Geoservices':'View portfolio file: Liahona Geoservices'}).click();await expect(page.locator('dialog')).toBeVisible();await expect(page.locator('dialog img')).toBeVisible();await page.getByRole('button',{name:'Close portfolio file'}).click();await expect(page.locator('dialog')).not.toBeVisible();
  await page.getByRole('link',{name:'Contact us',exact:true}).click();await expect(page.locator('[name=name]')).toBeVisible();await expect(page.locator('.navigation')).toHaveClass(/is-entered/);await page.waitForTimeout(700);await page.screenshot({path:testInfo.outputPath('contact-form.png')});
  await expect(page.getByText('+234 911 571 6254 ↗')).toHaveCount(0);await expect(page.getByText(/Nigeria · Working/)).toHaveCount(0);
  await page.locator('[name=name]').fill('Ada Okafor');await page.locator('[name=business]').fill('A&B Studio');await page.locator('[name=email]').fill('ada@example.com');await page.locator('[name=message]').fill('A launch with + signs & a new website.');
  expect(await page.getByRole('link',{name:'Instagram ↗'}).getAttribute('href')).toBe('https://www.instagram.com/8dat_work/');expect(failedAssets).toEqual([]);expect(errors).toEqual([]);
  await page.locator('.footer-logo').scrollIntoViewIfNeeded();const liquid=page.locator('.liquid-letter').first();await liquid.hover();await expect(liquid).toBeVisible();expect(await liquid.evaluate(el=>parseFloat(getComputedStyle(el).opacity))).toBe(1);await page.screenshot({path:testInfo.outputPath('footer-liquid.png')});
  let handoff;await page.route('https://wa.me/**',route=>{handoff=new URL(route.request().url());return route.abort();});await page.getByRole('button',{name:'Continue to WhatsApp'}).click();await expect.poll(()=>handoff?.pathname).toBe('/2349115716254');expect(handoff.searchParams.get('text')).toContain('Business: A&B Studio');expect(handoff.searchParams.get('text')).toContain('A launch with + signs & a new website.');
 });
}
