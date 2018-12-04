import React, { Component } from 'react';
import { CompactPicker } from 'react-color';
import DropMenu from './DropMenu';
// this class should send information about the style back to Container
// Container takes the information and adds/modifies the style for the currently selected Div

const properties = {
  // if x.values is an array, give drop down menu
  // if x.values is a string, .split(' ')
    // for each, if ['width', 'int', 'height', 'hOffset', 'vOffset', 'blur', 'spread', 'count', ...], input=>number, but should have 'px' appended at the end
    // if 'color', color picker
    // if 'style', call x.style and give drop down menu
    a: [
      {
        name: 'align-content',
        values: ["stretch", "center", "flex-start", "flex-end", "space-between", "space-around", "initial", "inherit"]
      },
      {
        name: 'align-items',
        values: ["stretch", "center", "flex-start", "flex-end", "baseline", "initial", "inherit"]
      },
      {
        name: 'align-self',
        values: ["auto", "stretch", "center", "flex-start", "flex-end", "baseline", "initial", "inherit"]
      },
    ],
    b: [
      {
        name: 'background',
        values: 'color',
        color: 'color'
      },
      {
        name: 'border',
        values: 'width style color',
        width: 'number',
        style: ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"],
        color: 'color'
      },
      {
        name: 'border-top',
        values: 'width style color',
        style: ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"],
        width: 'number',
        color: 'color'
      },
      {
        name: 'border-left',
        values: 'width style color',
        style: ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"],
        width: 'number',
        color: 'color'
      },
      {
        name: 'border-bottom',
        values: 'width style color',
        style: ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"],
        width: 'number',
        color: 'color'
      },
      {
        name: 'border-right',
        values: 'width style color',
        style: ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"],
        width: 'number',
        color: 'color'
      },
      {
        name: 'bottom',
        values: 'number',
        number: 'number'
      },
      {
        name: 'boxShadow',
        values: 'hOffset vOffset blur spread color',
        hOffset: 'number',
        vOffset: 'number',
        blur: 'number',
        spread: 'number',
        color: 'color'
      },
      {
        name: 'boxSizing',
        values: ["content-box", "border-box", "initial", "inherit"]
      }
    ],
    c: [
      {
        name: 'clear',
        values: ["none", "left", "right", "both", "initial", "inherit"]
      },
      {
        name: 'color',
        values: 'color',
        color: 'color'
      },
      {
        name: 'columns',
        values: 'width count',
        width: 'number',
        count: 'number'
      },
      {
        name: 'column-rule',
        values: 'width style color',
        style: ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"],
        width: 'number',
        color: 'color'
      },
      {
        name: 'column-span',
        values: ['1', 'all']
      }
    ],
    d: [
      {
        name: 'display',
        values: ["inline", "block", "contents", "flex", "grid", "inline-block", "inline-flex", "inline-grid", "inline-table", "list-item", "run-in", "table", "table-caption", "table-column-group", "table-header-group", "table-footer-group", "table-row-group", "table-cell", "table-column", "table-row", "none"]
      }
    ],
    f: [
      {
        name: 'flex',
        values: 'grow shrink basis',
        grow: 'number',
        shrink: 'number',
        basis: 'number'
      },
      {
        name: 'float',
        values: ['none', 'left', 'right']
      }
    ],
    // add grid later; let user enter number of columns to make, and height for rows
    // g: [
    //   {
    //     name: 'grid',
    //
    //   }
    // ],
    h: [
      {
        name: 'height',
        values: 'number',
        number: 'number'
      }
    ],
    j: [
      {
        name: 'justify-content',
        values: ["flex-start", "flex-end", "center", "space-between", "space-around"]
      }
    ],
    l: [
      {
        name: 'left',
        values: 'number',
        number: 'number'
      }
    ],
    m: [
      {
        name: 'margin',
        values: 'top right bottom left',
        top: 'number',
        right: 'number',
        bottom: 'number',
        left: 'number'
      }
    ],
    o: [
      {
        name: 'object-fit',
        values: ["fill", "contain", "cover", "scale-down", "none"]
      },
      {
        name: 'opacity',
        values: 'float',
        float: 'number'
      },
      {
        name: 'outline',
        values: 'width style color',
        width: 'number',
        style: ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"],
        color: 'color'
      },
      {
        name: 'overflow',
        values: ["visible", "hidden", "scroll", "auto"]
      },
      {
        name: 'overflow-y',
        values: ["visible", "hidden", "scroll", "auto"]
      },
      {
        name: 'overflow-x',
        values: ["visible", "hidden", "scroll", "auto"]
      }
    ],
    p: [
      {
        name: 'padding',
        values: 'top right bottom left',
        top: 'number',
        right: 'number',
        bottom: 'number',
        left: 'number'
      },
      {
        name: 'position',
        values: ["static", "absolute", "fixed", "relative", "sticky"]
      }
    ],
    r: [
      {
        name: 'resize',
        values: ["none", "both", "horizontal", "vertical"]
      },
      {
        name: 'right',
        values: 'number',
        number: 'number'
      }
    ],
    t: [
      {
        name: 'top',
        values: 'number',
        number: 'number'
      }
    ],
    v: [
      {
        name: 'vertical-align',
        values: ["baseline", "sub", "super", "top", "middle", "bottom"]
      },
      {
        name: 'visibility',
        values: ["visible", "hidden", "collapse"]
      }
    ],
    w: [
      {
        name: 'width',
        values: 'number',
        number: 'number'
      }
    ],
    z: [
      {
        name: 'zIndex',
        values: 'number',
        number: 'number'
      }
    ],
}

const EnterNum = () => {
  return <input type='number'></input>
}

class Properties extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changePropertyName: '',
      changePropertyValue: '',
    }
  }

  handleClick = (e) => {
    this.setState({
      changePropertyName: e.target.name,
    }, () => {
      this.openForm();
    })
  }

  handleChange = (e) => {
    console.log(e.target.value);
      this.setState({
      changePropertyValue: e.target.value,
    })
  }

  handleChangeComplete = (color, e) => {
    this.setState({ changePropertyValue: color.hex });
  };


  getDropMenu = (options) => {
    return <DropMenu options={options} />
  }

  openForm = () => {
    const pName = this.state.changePropertyName;
    const prprty = properties[pName[0]].find(obj => obj.name === pName);
    let form = [];
    if (Array.isArray(prprty.values)) {
      form.push(this.getDropMenu(prprty.values));
    }

    return form;
      // if prprty.values is an array, render <DropMenu options={prprty.values} onChange={this.handleChange} />
      // if prprty.values is a string, const subProperties = prprty.values.split(' ')
      // for each x in subProperties, prprty[x]; if it is 'number', render <EnterNum onChange={this.handleChange} />
      // if it is 'color', render <CompactPicker color={#fff} onChangeComplete={this.handleChangeComplete} />
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
