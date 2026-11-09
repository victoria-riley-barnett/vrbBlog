import favicon from '../../theme/favicon.svg?raw';
export const GET = () => new Response(favicon, { headers: { 'Content-Type': 'image/svg+xml' } });
