import parse, {
  domToReact,
  Element,
  DOMNode,
  HTMLReactParserOptions,
} from 'html-react-parser';
import VideoContent from '../components/Video/VideoContent';
import ImageContent from '../components/Image/ImageContent';

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
            href.includes('youtube.com/watch') || href.includes('youtu.be');
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
      }
      return undefined;
    },
  };

  return parse(html, options);
}
