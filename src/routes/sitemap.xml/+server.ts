import type { RequestHandler } from '@sveltejs/kit';

interface Route {
	path: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}

const routes: Route[] = [
	{
		path: '/',
		changefreq: 'weekly',
		priority: 1.0
	}
];

export const GET: RequestHandler = async ({ url }) => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
			.map(
				(route) => `
    <url>
        <loc>${url.origin}${route.path}</loc>
        <lastmod>${route.lastmod || new Date().toISOString()}</lastmod>
        ${route.changefreq ? `<changefreq>${route.changefreq}</changefreq>` : ''}
        ${route.priority ? `<priority>${route.priority}</priority>` : ''}
    </url>`
			)
			.join('')}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
