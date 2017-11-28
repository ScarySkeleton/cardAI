import {
    // Field
    canDragg,
    canPutIn,
    gameFieldCurrentPlay,
    cardImgBlockCurrentPlayClass,
    gameFieldHumanDesk,
    // Card
    cardImgClass } from './variables';

let draggable = (function() {
    let dragObject = {};

    function getCords(elem) {
        const box = elem.getBoundingClientRect();
        return { 
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        }
    }

    function createAvatar(e) {
        if(!dragObject.elem) {
            return;
        }
        // save old position
        const avatar = dragObject.elem;
        const old = {
            parent: avatar.parentNode,
            nextSibling: avatar.nextSibling,
            position: avatar.position || '',
            left: avatar.left || '',
            top: avatar.top || '',
            zIndex: avatar.zIndex || ''
        };

        avatar.rollBack = () => {
            old.parent.insertBefore(avatar, old.nextSibling);
            avatar.style.position = old.position;
            avatar.style.left = old.left;
            avatar.style.top = old.top;
            avatar.style.zIndex = old.zIndex;
        }

        return avatar;
    }

    function startDrag(e) {
        const avatar = dragObject.avatar;
        
        document.body.appendChild(avatar);
        avatar.style.position = 'absolute';
        avatar.style.zIndex = 9999;
    }

    function finishDrag(e) {
        const dropElem = findDroppable(e);
        // IF drop element null - this means, 
        // that our card trying to put on some other field
        if(!dropElem) {
            dragObject.avatar.rollBack();
            return;
        }

        insertBlockToTheGameField(createBlockForDraggableCard(dragObject.elem), gameFieldCurrentPlay);
        resetDraggableStyle(dragObject.avatar);
    }

    function findDroppable(event) {
        // need to hide avatar, because, when we call elementFromPoint
        //      always will return our avatar (zIndex max)
        dragObject.avatar.hidden = true;
        const elem = document.elementFromPoint(event.clientX, event.clientY);
        dragObject.avatar.hidden = false;

        if(elem === null) {
            return null;
        }

        for(let i = 0, len = canPutIn.length; i < len; i += 1) {
            if(elem.closest(canPutIn[i])) {
                return true;
            }
        }

        return false;
    }

    function createBlockForDraggableCard(elem) {
        let imgContainer = document.createElement('div');
        imgContainer.className = cardImgBlockCurrentPlayClass;
        imgContainer.appendChild(elem);

        return imgContainer;
    }

    function insertBlockToTheGameField(elem, to) { 
        document.getElementsByClassName(to)[0].appendChild(elem);
    }

    function resetDraggableStyle(elem) {
        elem.style = 'none';
    }

    const mousedown = (e) => {         
        // If click was the right mouse btn
        if(e.which != 1) {
            return;
        }
    
        let elem = (function() {
            for(let i = 0, len = canDragg.length; i < len; i += 1) {
                if(e.target.closest(canDragg[i])) {
                    const elem = e.target.closest(canDragg[i]);
                    return elem;
                }
            }
        })();
        // if card drag on the empty place
        if(!elem) {
            return;
        }
        const parent = elem.parentElement;
        // IF we trying to drag elem from the
        // place, from where we don't want
        if(!parent.className.includes(gameFieldHumanDesk)) {
            return;
        }
    
        dragObject.elem = elem;
        dragObject.downX = e.pageX;
        dragObject.downY = e.pageY;
    }

    const mousemove = (e) => {
        // if dragable el is move - nothing to do
        if(!dragObject.elem) {
            return;
        }

        // Avatar - object, that we moving instead our 'real' object
        if(!dragObject.avatar) {
            // Get moving changes
            const moveX = e.pageX - dragObject.downX;
            const moveY = e.pageY - dragObject.downY;
            // If changes too little - don't move
            if(Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
            }

            dragObject.avatar = createAvatar(e);
            if(!dragObject.avatar) {
                // Cannot create avatar
                return;
            }

            const coords = getCords(dragObject.avatar);
            dragObject.shiftX = dragObject.downX - coords.left;
            dragObject.shiftY = dragObject.downY - coords.top;

            startDrag(e);
        }

        // change avatar position every moving
        dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
        dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

        return false;
    }

    const mouseup = (e) => {
        if(dragObject.avatar) {
            finishDrag(e);
        }

        dragObject = {};
    }

    document.onmousedown = mousedown;
    document.onmousemove = mousemove;
    document.onmouseup = mouseup;
});

export default draggable;