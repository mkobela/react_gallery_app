import React from 'react';

/***
 * @function component  Photo
***/
const Photo = (props) => {
  return (
    <li>
    <img src={props.url} alt={props.title} title={props.title}/>
  </li>
  );
}

export default Photo;