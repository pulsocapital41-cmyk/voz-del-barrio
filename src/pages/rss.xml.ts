import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const articles = await getCollection('noticias');
  const sorted = articles.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const itemsXml = sorted.map(art => `
    <item>
      <title><![CDATA[${art.data.title}]]></title>
      <link>https://vozdelbarrio.com.mx/noticias/${art.id}/</link>
      <guid>https://vozdelbarrio.com.mx/noticias/${art.id}/</guid>
      <description><![CDATA[${art.data.excerpt || art.data.subtitle || ''}]]></description>
      <pubDate>${art.data.pubDate.toUTCString()}</pubDate>
      <category><![CDATA[${art.data.category}]]></category>
      <author><![CDATA[${art.data.author}]]></author>
    </item>
  `).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>La Voz del Barrio GAM</title>
    <link>https://vozdelbarrio.com.mx</link>
    <description>Diario digital ciudadano y de proximidad comunitaria para la Alcaldía Gustavo A. Madero, CDMX.</description>
    <language>es-MX</language>
    <atom:link href="https://vozdelbarrio.com.mx/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
