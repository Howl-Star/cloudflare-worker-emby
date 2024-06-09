addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
    // Target Emby server URL
    const targetUrl = 'http://your-emby-server-ip-or-domain.com';

    // Construct new URL
    const url = new URL(request.url);
    const newUrl = targetUrl + url.pathname + url.search;

    // Clone headers
    const newHeaders = new Headers(request.headers);

    // Clone request body if it's not a GET or HEAD request
    let body = null;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        body = await request.clone().blob();
    }

    // Create new request
    const newRequest = new Request(newUrl, {
        method: request.method,
        headers: newHeaders,
        body: body,
        redirect: 'follow'
    });

    // Send request to target Emby server
    const response = await fetch(newRequest);

    // Return response
    return response;
}
