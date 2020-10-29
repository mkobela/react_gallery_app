import React from 'react';
import Photo from './Photo';

const PhotoContainer = (props) => {

  const photos = props.photos.map(photo =>
    <Photo key={photo.id} url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`} title={photo.title} />
  );
  
  return (
    <div className="photo-container">
      <h2>Images of: {props.tag}</h2>
      <ul>
        {photos}
      </ul>
    </div>
  );
}

export default PhotoContainer;