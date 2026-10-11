import './globals.css';
export const metadata = {
  title: '8 DAT — Business, with a better plot.',
  description: 'Strategy, brand, technology and operations. Follow the story of a business built to grow with 8 DAT.',
  metadataBase: new URL('https://8dat.work'),
  openGraph: { title: '8 DAT — Business, with a better plot.', description: 'A creative consultancy connecting the way you look, work and grow.', images: [{url: '/art/social.jpg', width: 1200, height: 630}] },
  icons: {icon:'/art/favicon.svg'}, robots: { index: true, follow: true }
};
export default function Layout({children}) { return <html lang="en"><body>{children}</body></html>; }
