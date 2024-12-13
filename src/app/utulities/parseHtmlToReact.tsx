import parse, {
  domToReact,
  Element,
  DOMNode,
  HTMLReactParserOptions,
} from 'html-react-parser';
import VideoContent from '../../components/Video/VideoContent';
import ImageContent from '../../components/ImageContent/ImageContent';
import {Heading, List, Text} from '@chakra-ui/react';
import {ElementType} from 'react';
import {Link as ChakraLink} from '@chakra-ui/react';
import {BLUE_500} from './colors';

type ConditionalValue =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'xs'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | undefined;

export default function parseHtmlToReact(html: string) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const {name, attribs, children} = domNode;
        // Image
        if (name === 'img' && attribs) {
          return (
            <ImageContent src={attribs.src} alt={attribs.alt || 'image'} />
          );
        }
        // Videos and links
        if (name === 'a' && attribs) {
          const href = attribs.href;
          const isYouTube =
            href.includes('youtube.com') || href.includes('youtu.be');
          const isVimeo = href.includes('vimeo.com');

          if (isYouTube || isVimeo) {
            return <VideoContent src={href} />;
          }

          return (
            <ChakraLink
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              display="inline-flex"
              _hover={{
                color: BLUE_500,
                textDecoration: 'underline',
              }}
              variant="underline"
            >
              {domToReact(children as DOMNode[])}
            </ChakraLink>
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
            <Heading
              as={name as ElementType}
              size={sizeMap[name] as ConditionalValue}
              mb={4}
            >
              {domToReact(children as DOMNode[])}
            </Heading>
          );
        }

        // Handle paragraphs
        if (name === 'p') {
          return (
            <Text mb={4}>{domToReact(children as DOMNode[], options)}</Text>
          );
        }

        // Handle unordered and ordered lists
        if (name === 'ul' || name === 'ol') {
          return (
            <List.Root as={name} pl="4" mb="4">
              {domToReact(children as DOMNode[])}
            </List.Root>
          );
        }

        // Handle list items
        if (name === 'li') {
          return <List.Item>{domToReact(children as DOMNode[])}</List.Item>;
        }
      }
      return undefined;
    },
  };

  return parse(html, options);
}
