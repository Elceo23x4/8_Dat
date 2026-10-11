export function assetURL(path, base = process.env.NEXT_PUBLIC_BASE_PATH || '') {
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Assets must use a local absolute path');
  return `${base.replace(/\/$/, '')}${path}`;
}
