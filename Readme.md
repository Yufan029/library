Live Demo: https://yufan029.github.io/library/
1. The svg cannot be click.

  Adding the event listener for svg, then not working, search a bit find this file:
https://gomakethings.com/detecting-click-events-on-svgs-with-vanilla-js-event-delegation/

then adding this to the css file
svg {
    pointer-events: none;
}

still not working, but it works on CodePen, so trying to find another reason.

then I found:
The before and after content has the z-index higher than the svg graph, the svg can be seen, but cannot be clicked.

2. What learned

create svg under certain namespace.

3. Code still bit tangled, can be refactor for more easy for further extension and maintain.

4. Not adding the remove from library array, since the data will be refresh every time when reload.
