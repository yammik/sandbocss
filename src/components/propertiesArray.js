const properties = {
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
        name: 'background-color',
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
        values: 'number',
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
      }
    ],
    t: [
      {
        name: 'top',
        values: 'number',
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
      }
    ],
    z: [
      {
        name: 'z-index',
        values: 'number',
      }
    ],
}

export { properties };
