export const contact = {
  email: 'enquiry@8dat.work',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '',
  x: process.env.NEXT_PUBLIC_X_URL || '',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || ''
};
export function whatsappURL(number, details) {
  const digits = String(number).replace(/[\s()+-]/g, '');
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  const text = `Hello 8 DAT,\n\nName: ${details.name.trim()}\nBusiness: ${details.business.trim()}\nEmail: ${details.email.trim()}\nInterested in: ${details.service}\n\nProject brief:\n${details.message.trim()}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
export function safeSocialURL(url){
  try { const parsed = new URL(url); return parsed.protocol === 'https:' ? parsed.href : null; } catch { return null; }
}
