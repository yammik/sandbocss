import React, { Component } from 'react';
import { CompactPicker } from 'react-color';
import DropMenu from './DropMenu';
import { properties } from './propertiesArray';

// this class should send information about the style back to controls
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
    console.log(e.target.name);
    if (e.target.name !== this.state.propNameToChange) {
      this.setState({
        propNameToChange: e.target.name,
        name: e.target.name,
      }, () => {
        this.openForm();
      })
    } else {
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
    this.setState(prevState => (
      {
        name: `${prevState.propNameToChange}-${name}`,
      }
    ))
  }

  handleChangeComplete = (color, e) => {
    this.setState({
      propValueToChange: color.hex,
    });
  };

  getDropMenu = (options, specific='') => {
    return <DropMenu specific={specific} options={options} setValue={this.setValue} setName={this.setName} />
  }

  handleInputChange = (e) => {
    this.setState({
      propValueToChange: e.target.name !== 'opacity' ? `${e.target.value}px` : e.target.value,
      name: e.target.name.replace('-number',''),
    })
  }

  getInputTag = (obj, key) => {
    const fullName = key && key !== 'number' ? `${obj.name}-${key}` : obj.name;
    return <span className="inputSpan">{key || obj.name}<input onChange={this.handleInputChange} name={`${fullName}`} className ></input>px</span>
  }

  getColorPicker = () => {
    return <div className='colorPicker'><CompactPicker color={this.state.propValueToChange} onChangeComplete={this.handleChangeComplete} /></div>
  }

  openForm = () => {
    const pName = this.state.propNameToChange;
    const propObj = properties[pName[0]].find(obj => obj.name === pName);
    let form = [];
    const { values } = propObj;

    if (typeof values === 'string') {
      const specificProperties = values.split(' ');
      specificProperties.forEach(prprtyKey => {
        const specPropValue = propObj[prprtyKey];
        form = this.formGen(form, propObj, specPropValue, prprtyKey)
      })
    } else {
      form = this.formGen(form, propObj, values);
    }
    return (
      <div className='options'>
        {form}
      </div>
    )
  }


  formGen = (bucket, obj, values, key='') => {
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
    const anchors = properties[key].map(x => <a href="#" name={x.name} key={x.name} onClick={this.handleClick}>{x.name}</a>);
    const result = [];
    anchors.forEach((a, i) => {
      result.push(a);
      if (i !== anchors.length-1) {
        result.push(' | ')
      }
    })
    return result;
  }

  render() {
    return (
      <div id="properties">
        <ul>
          {Object.keys(properties).map(
            propKey =>
            <li key={propKey}>
              {propKey}
              <span>{this.makeAs(properties, propKey)}</span>

              { this.state.propNameToChange[0] === propKey ? this.openForm() : null }

            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Properties;
