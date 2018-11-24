# CSS sandbox
  - Select from preset layouts, return CSS code that can produce the selected layout
    e.g. Parent div spanning 70% of width, child div with 500px width centered within parent div

  - Click & drag
    e.g. click & drag lower right corner of child div to change dimensions
         click & drag child div itself to change arrangement / alignment

  - Add elements to sandbox
    when click 'make div', make a child element inside currently selected element
    default selected element is 'window'
    give id/class to element as created (default name will be auto-incremented)

  - Provide preset color palette, also generate own
    5-color palette: 3 base, 2 accents
    color palette to change color of selected element on screen

  - Save favorite layouts
    name saved layout

  - fullscreen mode?

  Stretch feature:
  - animation
  - user save favorite layout


  * look up several common layouts (presets)




# Architecture:

App
|
|____Navbar
|
|____Sandbox --> state: divs stored as objects containing style info, currently selected object, xi, yi, xf, yf for calculating displacement,
        |
        |____Controls
        |
        |____Canvas
        |
        |____Output
