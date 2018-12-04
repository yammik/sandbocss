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

hit main
  classic
    can still make divs, just drag/resize
    all attrs on left
    sandbox keeps track of everything:
      1. for close-ended properties, drop menu
      2. for open-ended properties, allow number or color picker
      when either of 1 or 2 happens, update state
      with updated state, update div.style where div = the one you want

  interactive
    what I have so far (with code output fixes)

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


--------------
css properties


A
Align
  -content
  -items
  -self

B
Background
  -image
  -position
  -repeat
  -size
Border
  border (width, style, color)
  -bottom
  -left
  -right
  -top
  -radius
Bottom
box-shadow
box-sizing

C
clear
color
columns (width, count)
column
  -span
  -gap
clip *only if abs pos*

D
display

F
filter
flex (grow, shrink, basis)
  flex-flow (direction, wrap)
float

G
grid (template-rows, template-columns, template-areas, auto-rows, auto-columns, auto-flow)

H
height

J
justify-content

l
left

M
margin

O
object-fit
object-position
opacity
outline (width, style, color)
overflow
overflow-x
overflow-y

P
padding
perspective
perspective-origin
position

R
resize
right

T
top

V
vertical-align
visibility

W
width

Z
z-index
