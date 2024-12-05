import {remark} from 'remark';
import remarkBreaks from 'remark-breaks';
import html from 'remark-html';
import {visit} from 'unist-util-visit';

/**
 * Plugin to make certian parts like images, code blocks, and links block-level elements.
 */

export function remarkAdjustElements() {
  return (tree: any) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      const nonTextChildren = node.children.filter((child: any) =>
        ['image', 'html', 'break', 'link'].includes(child.type)
      );

      const textChildren = node.children.filter(
        (child: any) => child.type === 'text'
      );

      if (
        nonTextChildren.length > 0 &&
        (nonTextChildren.length >= node.children.length ||
          textChildren.every((child: any) => child.value.trim() === ''))
      ) {
        parent.children.splice(index, 1, ...nonTextChildren);
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
