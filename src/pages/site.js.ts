import script from '../../theme/site.js?raw';
export const GET = () => new Response(script, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
