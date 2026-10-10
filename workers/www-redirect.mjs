// Only the www hostname uses compute; the apex retains free static-asset serving.
export default {
  fetch(request) {
    const url = new URL(request.url);
    url.protocol = 'https:';
    url.hostname = 'homegeneratorguide.com';
    url.port = '';
    return new Response(null, {
      status: 301,
      headers: {
        Location: url.href,
        'Cache-Control': 'public, max-age=3600',
        'Strict-Transport-Security': 'max-age=31536000',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
      },
    });
  },
};
