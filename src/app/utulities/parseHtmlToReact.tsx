import parse, {
  domToReact,
  Element,
  DOMNode,
  HTMLReactParserOptions,
} from 'html-react-parser';
import VideoContent from '../components/Video/VideoContent';
import ImageContent from '../components/ImageContent/ImageContent';
import { Heading, Text } from '@chakra-ui/react';
import { ElementType } from 'react';

type ConditionalValue = "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | undefined;

export default function parseHtmlToReact(html: string) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const {name, attribs, children} = domNode;
        if (name === 'img' && attribs) {
          return (
            <ImageContent src={attribs.src} alt={attribs.alt || 'image'} />
          );
        }
        if (name === 'a' && attribs) {
          const href = attribs.href;
          const isYouTube =
            href.includes('youtube.com') || href.includes('youtu.be');
          const isVimeo = href.includes('vimeo.com');

          if (isYouTube || isVimeo) {
            return <VideoContent src={href} />;
          }

          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {domToReact(children as DOMNode[])}
            </a>
          );
        }
        // Handle headings
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(name)) {
          const sizeMap: Record<string, string> = {
            h1: '2xl',
            h2: 'xl',
            h3: 'lg',
            h4: 'md',
            h5: 'sm',
            h6: 'xs',
          };

          return (
            <Heading as={name as ElementType} size={sizeMap[name] as ConditionalValue} mb={4}>
              {domToReact(children as DOMNode[])}
            </Heading>
          );
        }


        // Handle paragraphs
        if (name === 'p') {
          return (
            <Text mb={4}>
              {domToReact(children as DOMNode[])}
            </Text>
          );
        }

      }
      return undefined;
    },
  };

  return parse(html, options);
}
