function moveSpaceman(x, y) {
    const element = spaceman('assets/SpaceMan/MiddlemanGif.gif')
    element.style.zIndex = 1;

    function anim(direction) {
        if (direction === null) {
            spaceman.src = 'assets/SpaceMan/MiddlemanGif.gif'
        }
        if (spacemanX === '37') {
            element.src = 'assets/SpaceMan/LMmanGif.gif'
        }
        if (spacemanY === '38') {
            element.src = 'assets/SpaceMan/MiddlemanGif.gif'
        }
        if (spacemanX === '39') {
            element.src = `assets/SpaceMan/MRmanGif.gif`
        }
        if (spacemanY === '40') {
            element.src = 'assets/SpaceMan/MiddlemanGif.gif'
        }
    }

    move(element).onkeydown(x, y, anim)

    return {
        element: element
    }
}
