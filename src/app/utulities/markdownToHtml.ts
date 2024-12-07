import {remark} from 'remark';
import remarkBreaks from 'remark-breaks';
import html from 'remark-html';
import {visit} from 'unist-util-visit';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

export function remarkAdjustElements() {
  return (tree: any) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      const hasText = node.children.some(
        (child: any) => child.type === 'text' && child.value.trim() !== ''
      );

      const nonTextChildren = node.children.filter((child: any) =>
        ['image', 'html', 'break'].includes(child.type)
      );

      const linkChildren = node.children.filter(
        (child: any) => child.type === 'link'
      );

      // If paragraph has only non-text children (images, html, breaks)
      if (!hasText && nonTextChildren.length === node.children.length) {
        parent.children.splice(index, 1, ...nonTextChildren);
      }

      // If paragraph contains links
      if (linkChildren.length > 0) {
        const textAndOtherChildren = node.children.filter(
          (child: any) => child.type !== 'link'
        );

        parent.children.splice(
          index,
          1,
          {...node, children: textAndOtherChildren},
          ...linkChildren
        );
      }
    });
  };
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkAdjustElements)
    .use(remarkHtml)
    .process(markdown);

  return result.toString();
}
