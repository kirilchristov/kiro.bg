import {remark} from 'remark';
import remarkBreaks from 'remark-breaks';
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

      if (!hasText && nonTextChildren.length === node.children.length) {
        parent.children.splice(index, 1, ...nonTextChildren);
      }

      const linkChildren = node.children.filter(
        (child: any) => child.type === 'link'
      );

      if (linkChildren.length > 0) {
        parent.children[Number(index)] = {
          ...node,
          children: [...node.children],
        };
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
