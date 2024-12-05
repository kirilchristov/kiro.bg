import {remark} from 'remark';
import remarkBreaks from 'remark-breaks';
import html from 'remark-html';
import {visit} from 'unist-util-visit';

/**
 * Plugin to make certian parts like images, code blocks, and links block-level elements.
 */

// function remarkAdjustElements() {
//   return (tree: any) => {
//     visit(tree, 'paragraph', (node, index, parent) => {
//       const newChildren = node.children.flatMap((child: any) => {
//         if (['image', 'link', 'inlineCode'].includes(child.type)) {
//           return [child];
//         }
//         return child;
//       });

//       parent.children.splice(index, 1, {
//         ...node,
//         children: newChildren,
//       });
//     });
//   };
// }

export function remarkAdjustElements() {
  return (tree: any) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      // Check if paragraph contains only an image
      const isOnlyImage =
        node.children.length === 1 && node.children[0].type === 'image';

      if (isOnlyImage) {
        // Replace the paragraph with the image directly
        parent.children.splice(index, 1, node.children[0]);
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
