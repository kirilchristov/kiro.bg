import React from 'react';

type VideoComponentProps = {
  src: string;
};

export default function VideoContent({src}: VideoComponentProps) {
  let embedUrl = '';

  if (src.includes('youtube.com/watch') || src.includes('youtu.be')) {
    const videoId =
      src.split('v=')[1]?.split('&')[0] || src.split('youtu.be/')[1];
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (src.includes('vimeo.com')) {
    const videoId = src.split('vimeo.com/')[1];
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
  }

  if (!embedUrl) {
    return null;
  }

  return (
    <div className="video-wrapper">
      <iframe
        src={embedUrl}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Embedded video"
      ></iframe>
    </div>
  );
}