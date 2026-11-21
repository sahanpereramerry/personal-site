/* Everything that appears on the front page lives here; the article text lives in src/articles/<slug>.html. */

export const site = {
  url: 'https://www.sahanpm.com',
  title: 'Sahan Perera-Merry | Writer, Builder, Operator',
  description:
    'Writer, builder and operator in B2B technology content. I turn engineering and research into writing experts respect, build the AI workflows that scale it, and get it signed off by clients and CEOs.',
  image: '/headshot.png',
};

export const pillars = {
  writer: { n: '01', name: 'Writer', lead: 'Prose that engineers respect and buyers actually read.' },
  builder: { n: '02', name: 'Builder', lead: 'Systems for the parts of editorial work that shouldn’t be done by hand.' },
  operator: { n: '03', name: 'Operator', lead: 'The judgement to get complex work through technical, legal, and client sign-off.' },
};

/* Order here is the order on the page. `slug` is the address (/articles/<slug>) and the file name in src/articles.
   `id` is what links inside the article text point at: <a class="il" href="/articles/<slug>" data-open="<id>">. */
export const articles = [
  {
    id: 'w1',
    slug: 'commentary-model',
    pillar: 'writer',
    title: 'Commentary is better for executive thought leadership than extraction',
    line: 'Twelve posts for a Responsible AI CEO, reaching 40,000+ impressions and regulators in the UK and EU.',
  },
  {
    id: 'w2',
    slug: 'engineering-arguments',
    pillar: 'writer',
    title: 'Turning engineering work into arguments that experts respect',
    line: 'How an internal architecture deck became a commercial piece that engineering signed off in one pass.',
  },
  {
    id: 'b1',
    slug: 'briefing-system',
    pillar: 'builder',
    title: 'From 100 articles to 3 that matter',
    line: 'An automated Copilot Studio pipeline monitoring 20 global feeds for sales every morning.',
  },
  {
    id: 'b2',
    slug: 'cms-editorial-context',
    pillar: 'builder',
    title: 'The editorial context you need is already in your CMS',
    line: 'A local SQLite and vector search engine across 23,000 records to automate content placement and briefs.',
  },
  {
    id: 'o1',
    slug: 'approval-bottleneck',
    pillar: 'operator',
    title: 'When drafting gets cheap, approval becomes the bottleneck',
    line: 'A tracker that asks who owes the next decision, and a rule that nothing is drafted before the client agrees in writing.',
  },
  {
    id: 'o2',
    slug: 'wired-feature',
    pillar: 'operator',
    title: 'How an engineering demo became a WIRED feature',
    line: 'Cold email, an AI model that speaks Ancient Greek, and twelve days from pitch to publication.',
  },
];

const bodies = import.meta.glob('../articles/*.html', { query: '?raw', import: 'default', eager: true });

export function bodyOf(slug) {
  const html = bodies[`../articles/${slug}.html`];
  if (!html) throw new Error(`No article text at src/articles/${slug}.html`);
  return html.trim();
}
