import React from 'react';


// TODO: Should take an array of objects, and return the options.
const Options = ({}) => {

  const anchors = properties[key].map(property => <a href="/" name={property.name} key={property.name} onClick={this.handleClick}>{property.name}</a>);
  const result = [];
  anchors.forEach((a, i) => {
    result.push(a);
    if (i !== anchors.length-1) {
      // insert divider
      result.push(' | ')
    }
  })
  return result;

  return ()
}

export default Options;
