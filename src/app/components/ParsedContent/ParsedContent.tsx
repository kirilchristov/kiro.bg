import React from 'react';
import {useProcessor} from '../hooks/useProcessor';

type Props = {
  htmlContent: string;
};

export const ParsedContent = ({htmlContent}: Props) => {
  const processedContent = useProcessor(htmlContent);

  return (
    <div className="app">
      {processedContent !== null && (
        <div dangerouslySetInnerHTML={{__html: processedContent}} />
      )}
    </div>
  );
};
