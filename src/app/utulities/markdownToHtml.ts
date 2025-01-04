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

      // Handle paragraphs with only media content
      if (!hasText && nonTextChildren.length === node.children.length) {
        parent.children.splice(index, 1, ...nonTextChildren);
        return;
      }

      // Group text and links together
      const childGroups: any[] = [];
      let currentGroup: any[] = [];

      node.children.forEach((child: any) => {
        if (child.type === 'text' || child.type === 'link') {
          currentGroup.push(child);
        } else {
          if (currentGroup.length > 0) {
            childGroups.push({
              type: 'paragraph',
              children: currentGroup,
            });
            currentGroup = [];
          }
          childGroups.push(child);
        }
      });

      // Add any remaining grouped children
      if (currentGroup.length > 0) {
        childGroups.push({
          type: 'paragraph',
          children: currentGroup,
        });
      }

      // Replace the original node with the grouped content
      if (childGroups.length === 1) {
        Object.assign(node, childGroups[0]);
      } else {
        parent.children.splice(index, 1, ...childGroups);
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
