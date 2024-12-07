import React from 'react';
import Image from 'next/image';

const ImageContent = ({src, alt}: {src: string; alt: string}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1600px',
        height: 'auto',
        margin: '0 auto',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={0}
        style={{objectFit: 'fill', maxWidth: '100%', height: 'auto'}}
        loading="lazy" 
        placeholder="blur" 
        blurDataURL="/images/placeholder.png" 
      />
    </div>
  );
};

export default ImageContent;
