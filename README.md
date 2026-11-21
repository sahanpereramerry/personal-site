# sahanpm.com

Sahan Perera-Merry's personal site. Built with Astro and deployed on Vercel.

The front page lists six articles under three pillars (Writer, Builder, Operator). Opening an article slides it in as a pane beside the front page, and each article has its own address at `/articles/<slug>`.

## Where things are

| What | Where |
|---|---|
| Article text | `src/articles/<slug>.html` |
| Article titles, order, pillar and the one-line description under each title | `src/data/site.js` |
| Pillar names and their lines | `src/data/site.js` |
| Hero, credentials strip and footer | `src/components/Site.astro` |
| Styles | `src/site/styles.css` |
| Pane behaviour and addresses | `src/site/client.js` |
| Portrait, favicon, `llms.txt` | `public/` |
| Redirects from old addresses | `vercel.json` |

## Editing an article

Open its file in `src/articles` and change the HTML. Paragraphs are `<p>`, section headings are `<h4>`.

A link from one article to another looks like this, where `w2` is the target's `id` in `src/data/site.js`:

```html
<a class="il" href="/articles/engineering-arguments" data-open="w2">the linked phrase</a>
```

The "Linked to from" list at the foot of each article and the hover highlights on the front page are worked out from these links.

## Adding an article

1. Add `src/articles/<slug>.html`.
2. Add an entry to `articles` in `src/data/site.js` with a new `id`, the `slug`, the `pillar`, the `title` and the `line`.
3. Add it to `public/llms.txt`.

The one-line description is also what shows in link previews when the article is shared.

## Running it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```
