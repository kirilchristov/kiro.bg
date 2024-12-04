import {remark} from 'remark';
import remarkBreaks from 'remark-breaks';
import html from 'remark-html';

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkBreaks).use(html).process(markdown);

  return result.toString();
}
