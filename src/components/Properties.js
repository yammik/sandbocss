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
      changePropertyName: '',
      changePropertyValue: '',
      name: '',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.changePropertyValue !== prevState.changePropertyValue) {
      let style;
      if (this.state.name) {
        style = { [this.state.name]: this.state.changePropertyValue};
      } else {
        style = { [this.state.changePropertyName]: this.state.changePropertyValue};
      }
      this.props.addStyle(style);
    }
  }

  handleClick = (e) => {
    this.setState({
      changePropertyName: e.target.name,
    }, () => {
      this.openForm();
    })
  }

  setValue = (value) => {
      this.setState({
      changePropertyValue: value,
    })
  }

  setName = (name) => {
    this.setState(prevState => (
      {
        name: `${prevState.changePropertyName}-${name}`,
      }
    ))
  }

  handleChangeComplete = (color, e) => {
    this.setState({
      changePropertyValue: color.hex,
    });
  };

  getDropMenu = (options, specific='') => {
    return <DropMenu specific={specific} options={options} setValue={this.setValue} setName={this.setName} />
  }

  openForm = () => {
    const pName = this.state.changePropertyName;
    const prprty = properties[pName[0]].find(obj => obj.name === pName);
    let form = [];
    const { values } = prprty;
    if (Array.isArray(values)) {
      form.push(this.getDropMenu(values));
    } else {
      const propertiess = values.split(' ');
      propertiess.forEach(p => {
        if (Array.isArray(prprty[p])) {

          form.push(this.getDropMenu(prprty[p], p));

        } else if (prprty[p] === 'number') {

          const inputTag = <span>{p}<input label={p}></input>px</span>
          form.push(inputTag);

        } else if (prprty[p] === 'color') {

          const colorPicker = <div className='colorPicker'><CompactPicker color={this.state.changePropertyValue} onChangeComplete={this.handleChangeComplete} /></div>
          form.push(colorPicker);

        }
      })
    }

    return (
      <div class='options'>
        {form}
      </div>
    )
  }

  makeAs = (properties, key) => {
    const anchors = properties[key].map(x => <a href="#" name={x.name} onClick={this.handleClick}>{x.name}</a>);
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
            <li>
              {propKey}
              <span>{this.makeAs(properties, propKey)}</span>

              { this.state.changePropertyName[0] === propKey ? this.openForm() : null }

            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Properties;
