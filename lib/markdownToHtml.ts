import {remark} from 'remark';
import remarkBreaks from 'remark-breaks';
import html from 'remark-html';
import {visit} from 'unist-util-visit';

/**
 * Plugin to make certian parts like images, code blocks, and links block-level elements.
 */

function remarkAdjustElements() {
  return (tree: any) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      const specialNodes = node.children.filter((child: any) =>
        ['image', 'link', 'inlineCode'].includes(child.type)
      );

      if (specialNodes.length > 0) {
        parent.children.splice(index, 1, ...specialNodes);
      }
    });
  };
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkBreaks)
    .use(remarkAdjustElements)
    .use(html)
    .process(markdown);

  return result.toString();
}
