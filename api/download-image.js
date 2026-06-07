export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Only allow images from known domains
  const allowed = ['raw.githubusercontent.com', 'github.com', 'firebasestorage.googleapis.com'];
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  if (!allowed.some(d => parsed.hostname.endsWith(d))) {
    return res.status(403).json({ error: 'Domain not allowed' });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch image' });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', 'https://dordai.art');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(200).send(buffer);
  } catch (e) {
    return res.status(500).json({ error: 'Proxy error' });
  }
}
