import { dragable } from "./logic";

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
        console.log(dropElem);
    }

    function findDroppable(event) {
        // need to hide avatar, because, when we call elementFromPoint
        //      always will return our avatar (zIndex max)
        dragObject.avatar.hidden = true;
        const elem = document.elementFromPoint(event.clientX, event.ClientY);
        dragObject.avatar.hidden = false;

        if(elem === null) {
            return null;
        }
        return elem.closest('.card');
    }

    const mousedown = (e) => {         
        // If click was the right mouse btn
        if(e.which != 1) {
            return;
        }
    
        let elem = e.target.closest('.card');    
        // if card drag on the empty place
        if(!elem) {
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