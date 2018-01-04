# Card Sandbox

### Description

Provides a scripting lanaguge to easily create card games and play them. You can also view, modify, and play games created by other users.

### Example: Simple Solitaire Script

```
init
table 8 6
deck 0 0 full shuffle visible // deck
deck 0 2 empty order visible // draw

let 4 x (2 3 4 5) // pillars
init
deck x 0 empty order visible

let 6 x (2 3 4 5 6 7) n (1 2 3 4 5 6) // main
init
deck x 2 empty order visible vert -1
move (stack 0 0 n) (x 2 top)

interact // draw
state 0 1
click 0 0
ifnot empty 0 0
move (0 0 top) (0 2 top)
unselect
setstate 0

interact // reshuffle
state 0 1
click 0 0
if empty 0 0
move (stack 0 2 all) (0 0 top)
unselect
setstate 0

interact // select draw
state 0
click 0 2
ifnot empty 0 2
setselect (0 2 top)
setstate 1

interact // unselect draw
state 1
click 0 2
unselect
setstate 0

let 4 x (2 3 4 5) suit (h s d c) // add to pillar
interact
state 1
click x 0
if istop (selected)
if numericdif (selected) (x 0 top) 1
if suitequal (selected) suit
move (selected) (x 0 top)
unselect
setstate 0

let 4 x (2 3 4 5) suit (h s d c) // move base to pillar
interact
state 1
click x 0
if istop (selected)
if numericequal (selected) 1
if suitequal (selected) suit
move (selected) (x 0 top)
unselect
setstate 0

let 6 x (2 3 4 5 6 7) // select main
interact
state 0
click x 2
setselect (highlighted)
setstate 1

let 6 x (2 3 4 5 6 7) // move to main
interact
state 1
click x 2
if numericdif (selected) (x 2 top) -1
ifnot colorsame (selected) (x 2 top)
if coloralternating (selectedstack)
if numericIncrementing (selectedstack) -1
move (selectedrepeatstack) (x 2 top)
unselect
setstate 0

let 6 x (2 3 4 5 6 7) // move king to empty main
interact
state 1
click x 2
if empty x 2
if numericequal (selected) 13
if coloralternating (selectedstack)
if numericIncrementing (selectedstack) -1
move (selectedrepeatstack) (x 2 top)
unselect
setstate 0

let 6 x (2 3 4 5 6 7) // unselect main
interact
state 1
click x 2
unselect
setstate 0
```

### Example: Resulting Game

![demo solitaire gify](../master/gifys/solitaire.gify)