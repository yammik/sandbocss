import React from 'react';


// TODO: Should take an array of objects, and return the options.
const Options = ({ property, handleClick }) => {
  return (
    <a href="/" name={property.name} key={property.name} onClick={handleClick}>{property.name}</a>
  )
}

export default Options;
