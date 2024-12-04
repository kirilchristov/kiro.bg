import {createElement, Fragment, useEffect, useState, JSX} from 'react';
import {unified} from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeReact, {Options} from 'rehype-react';
// import {CustomImage, CustomVideo, CustomLink} from './CustomComponents';

export const useProcessor = (htmlText: string) => {
  const [Content, setContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    unified()
      .use(rehypeParse, {fragment: true})
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          //   img: CustomImage,
          //   iframe: CustomVideo,
          //   a: CustomLink,
        },
      } as unknown as Options)
      .process(htmlText)
      .then((file) => {
        setContent(() => file.result as unknown as JSX.Element);
      });
  }, [htmlText]);

  return Content;
};
