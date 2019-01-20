import React, { Component } from 'react';
import { CompactPicker } from 'react-color';
import DropMenu from './DropMenu';

// properties is all of the CSS properties
import { CSSProps } from './propertiesArray';

// this class sends information about the style back to controls
// controls gives the info to container which takes the information and adds/modifies the style for the currently selected Div

class Properties extends Component {
  constructor(props) {
    super(props)
    this.state = {
      propNameToChange: '',
      propValueToChange: '',
      name: '',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: should be able to update right when user clicks on the value of the CSS prop without storing it in state
    // currently, this component stores in the state the CSS prop to be changed and its value ...
    // and updates the div.style when the state is updated
    if (this.state.propValueToChange !== prevState.propValueToChange) {
      let style;
      if (this.state.name) {
        style = { [this.state.name]: this.state.propValueToChange};
      } else {
        style = { [this.state.propNameToChange]: this.state.propValueToChange};
      }
      this.props.addStyle(style);
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    // the if block below allows options form/menu to be closed when the name of the CSS property is clicked again
    if (e.target.name !== this.state.propNameToChange) {
      this.setState({
        propNameToChange: e.target.name,
        name: e.target.name,
      }, () => {
        this.openForm();
      })
    } else {
      // re-clicking the same property's name unsets current property and closes menu
      this.setState({
        propNameToChange: '',
        name: '',
      })
    }
  }

  setValue = (value) => {
      this.setState({
      propValueToChange: value,
    })
  }

  setName = (name) => {
    // needed this because some CSS properties have two parts to the name, and some do not
    // e.g. 'border-left', vs. 'opacity'
    this.setState(prevState => (
      {
        name: `${prevState.propNameToChange}-${name}`,
      }
    ))
  }

  handleChangeComplete = (color, e) => {
    // this is only for options requiring color palette
    this.setState({
      propValueToChange: color.hex,
    });
  };

  getDropMenu = (options, specific='') => {
    // 'specific' being the second part of a CSS property name, like 'border-*left*', 'margin-*top*'
    // need that to specify the style when we actually pass it in to div being rendered
    return <DropMenu key={specific} specific={specific} options={options} setValue={this.setValue} setName={this.setName} />
  }

  handleInputChange = (e) => {
    this.setState({
      // number inputs either have suffix 'px', or no suffix in the case of opacity and z-index
      propValueToChange: 'opacity z-index'.includes(e.target.name) ? e.target.value : `${e.target.value}px`,
      // because of the way form automatically appends the type of input for some of the options to the CSS property name, ...
      // need to remove for those requiring some number input ...
      // otherwise, we'd get property name being passed in as something like 'opacity-number'
      name: e.target.name.replace('-number',''),
    })
  }

  getInputTag = (obj, key) => {
    // this is for making input field for options requiring a number input
    // obj is the CSS property currently being specified
    // key is where you get the type of option available for the property
    const fullName = (key && key !== 'number') ? `${obj.name}-${key}` : obj.name;
    return <span className="inputSpan">{key || obj.name}<input onChange={this.handleInputChange} name={`${fullName}`} ></input>{'opacity z-index'.includes(obj.name) ? '' : 'px'}</span>
  }

  getColorPicker = () => {
    // this is for input for options requiring color
    return <div className='colorPicker' key={this.state.propValueToChange}><CompactPicker style={{'text-align': '', 'margin': '0px'}} color={this.state.propValueToChange} onChangeComplete={this.handleChangeComplete} /></div>
  }

  openForm = () => {
    // this creates input field for options (input for number, dropMenu, colorPicker)
    // when user clicks on a property to change, look up the object with that name in the list of all CSS properties as defined in ./propertiesArray.js
    const pName = this.state.propNameToChange;
    // pName[0] because the properties are grouped together in an object by the first letter
    const propObj = CSSProps[pName[0]].find(obj => obj.name === pName);
    let form = [];
    const { values } = propObj;

    // values are either a string or array, depending on if the options have further specification
    // see lines 4-5 in ./propertiesArray.js for more an example
    if (propObj.takes) {
      Object.keys(propObj.takes).forEach(prprtyKey => {
        const specificPropValue = propObj.takes[prprtyKey];
        form = this.formGen(form, propObj, specificPropValue, prprtyKey);
      })
    // }
    // if (typeof values === 'string') {
    //   const specificProperties = values.split(' ');
    //   // this is really ugly because of the flat structure of the property objects in ./propertiesArray.js.
    //   // if information is nested, it would be more organized
    //   // but this works for now...for now.
    //   // splitting the string values goes allows specification of a property, like 'border-width' and 'border-color'
    //   // the input required for 'border-width' is 'number'. Therefore obj['width'] = 'number', or obj['color'] = 'color', or obj['style'] = [ /* some array */]
    //   // the block below basically does this for every item produced by splitting the string that specifies which values are available
    //   specificProperties.forEach(prprtyKey => {
    //     const specPropValue = propObj[prprtyKey];
    //     form = this.formGen(form, propObj, specPropValue, prprtyKey)
    //   })
    } else {
      // if the property has a predetermined set of options to pick from, make a drop menu
      form = this.formGen(form, propObj, values);
    }
    return (
      <div className='options'>
        {form}
      </div>
    )
  }


  formGen = (bucket, obj, values, key='') => {
    // pops out input of different kind depending on the type
    if (Array.isArray(values)) {
      return bucket.concat(this.getDropMenu(values))
    }
    if (values === 'number') {
      return bucket.concat(this.getInputTag(obj, key))
    }
    if (values === 'color') {
      return bucket.concat(this.getColorPicker());
    }
  }

  makeAs = (properties, key) => {
    // this makes the tags for each CSS property displaying their name, in an ul
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
  }

  render() {
    return (
      <div id="properties">
        <ul>
          {Object.keys(CSSProps).map(propKey =>
            <li key={propKey}>
              <span className="letter">{propKey}</span>
              <span className="names">{this.makeAs(CSSProps, propKey)}</span>

              { this.state.propNameToChange[0] === propKey ? this.openForm() : null }

            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Properties;
