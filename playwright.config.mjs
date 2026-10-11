import {defineConfig} from '@playwright/test';
const fallback=process.env.BROWSER_FALLBACK==='1';
export default defineConfig({
 outputDir:process.env.TEST_FILM==='1'?'media-test-results':'test-results',
 testDir:'tests/browser',fullyParallel:false,workers:1,timeout:120000,
 use:{baseURL:`http://127.0.0.1:3001${process.env.NEXT_PUBLIC_BASE_PATH||''}/`,
  launchOptions:{executablePath:process.env.BROWSER_EXECUTABLE||undefined,args:fallback?['--no-sandbox','--no-zygote','--single-process','--disable-gpu','--disable-software-rasterizer']:['--use-angle=swiftshader','--enable-unsafe-swiftshader']},
  screenshot:'only-on-failure',trace:'retain-on-failure'},
 webServer:{command:'node scripts/serve-export.mjs',url:`http://127.0.0.1:3001${process.env.NEXT_PUBLIC_BASE_PATH||''}/`,reuseExistingServer:false},
 reporter:[['list'],['html',{open:'never',outputFolder:process.env.TEST_FILM==='1'?'media-playwright-report':'playwright-report'}]]
});
