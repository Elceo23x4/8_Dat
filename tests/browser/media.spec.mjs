import {test,expect} from '@playwright/test';
test.describe('Arrival film production adapter',()=>{
 test.skip(process.env.TEST_FILM!=='1','Runs against the generated verification film, not a production asset.');
 test('film follows forward/reverse scroll and reduced motion removes it',async({page})=>{
  await page.goto('./');const film=page.locator('video');await expect(film).toHaveClass(/is-ready/);
  const seek=async progress=>{await page.locator('.arrival').evaluate((el,p)=>window.scrollTo({top:(el.offsetHeight-innerHeight)*p,behavior:'instant'}),progress);await expect.poll(()=>film.evaluate(v=>v.currentTime/v.duration)).toBeCloseTo(progress,1);};
  await seek(.7);await seek(.2);
  await page.emulateMedia({reducedMotion:'reduce'});await expect(film).toHaveCount(0);await expect(page.locator('.webgl-host canvas')).toHaveCount(0);await expect(page.locator('.architecture .architectural-poster')).toBeVisible();
 });
 test('failed media recovers to WebGL',async({page})=>{
  await page.route('**/media/verification-fixture.mp4',r=>r.abort());await page.goto('./');await expect(page.locator('video')).toHaveCount(0);await expect(page.locator('.webgl-host canvas')).toBeVisible();
 });
});
