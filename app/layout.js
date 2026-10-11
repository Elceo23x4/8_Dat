import './globals.css';
import {assetURL} from '../lib/assets.mjs';
export const metadata = {
  title: '8 DAT — Business, with a better plot.',
  description: 'Strategy, brand, technology and operations. Follow the story of a business built to grow with 8 DAT.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://elceo23x4.github.io'),
  openGraph: { title: '8 DAT — Business, with a better plot.', description: 'A creative consultancy connecting the way you look, work and grow.', images: [{url: assetURL('/art/social.jpg'), width: 1200, height: 630}] },
  icons: {icon:assetURL('/art/favicon.svg')}, robots: { index: true, follow: true }
};
export default function Layout({children}) { return <html lang="en"><body>{children}</body></html>; }
