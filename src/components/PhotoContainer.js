import React from 'react';
import Photo from './Photo';

const PhotoContainer = (props) => {

  let title = `Images of: ${props.tag}`;

  let photos = props.photos.map(photo =>
    <Photo key={photo.id} url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`} title={photo.title} />
  );

  if(photos === null || photos.length === 0){
   title = 'No photos available for this search';
  }
  
  return (
    <div className="photo-container">
      <h2>{title}</h2>
      <ul>
        {photos}
      </ul>
    </div>
  );
}

export default PhotoContainer;