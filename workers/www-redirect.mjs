// Only the www hostname uses compute; the apex retains free static-asset serving.
export default {
  fetch(request) {
    const url = new URL(request.url);
    url.protocol = 'https:';
    url.hostname = 'standbygeneratorguide.com';
    url.port = '';
    return new Response(null, {
      status: 301,
      headers: {
        Location: url.href,
        'Cache-Control': 'public, max-age=3600',
        'Strict-Transport-Security': 'max-age=31536000',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Content-Security-Policy': "default-src 'none'; base-uri 'none'; object-src 'none'; frame-src 'none'; frame-ancestors 'none'; form-action 'none'",
      },
    });
  },
};
