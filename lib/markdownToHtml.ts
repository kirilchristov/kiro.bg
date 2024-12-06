import {remark} from 'remark';
import remarkBreaks from 'remark-breaks';
import html from 'remark-html';
import {visit} from 'unist-util-visit';

/**
 * Plugin to make certian parts like images, code blocks, and links block-level elements.
 */

// export function remarkAdjustElements() {
//   return (tree: any) => {
//     visit(tree, 'paragraph', (node, index, parent) => {
//       // console.log(node.children);
//       const nonTextChildren = node.children.filter((child: any) =>
//         ['image', 'html', 'break', 'link'].includes(child.type)
//       );

//       const textChildren = node.children.filter(
//         (child: any) => child.type === 'text'
//       );

//       if (
//         nonTextChildren.length > 0 &&
//         (nonTextChildren.length >= node.children.length ||
//           textChildren.every((child: any) => child.value.trim() === ''))
//       ) {
//         parent.children.splice(index, 1, ...nonTextChildren);
//       }
//     });
//   };
// }

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
    .use(remarkBreaks)
    .use(remarkAdjustElements)
    .use(html)
    .process(markdown);

  return result.toString();
}
