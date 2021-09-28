function _(id) {
    return document.getElementById(id);
}

var droppedIn = false;
var pageX = 0;
var pageY = 0;

window.onload = function () {
    // A handly function to block event default and propagation
    function block(e) {
        try {
            e.stopPropagation();
            e.preventDefault();
        } catch (exception) {
            console.log(exception);
        }
    }

    // Drag zone functionality
    var dropZone1 = _('drop_zone1');

    dropZone1.addEventListener('dragenter', handleDragEnter, false);
    dropZone1.addEventListener('dragleave', handleDragLeave, false);
    dropZone1.addEventListener('drop', handleDragDrop, false);
    dropZone1.ondragover = function() { return false; };

    var dropZone2 = _('drop_zone2');

    dropZone2.addEventListener('dragenter', handleDragEnter, false);
    dropZone2.addEventListener('dragleave', handleDragLeave, false);
    dropZone2.addEventListener('drop', handleDragDrop, false);
    dropZone2.ondragover = function() { return false; };

    function handleDragEnter(e) {
        block(e);
        _('app_status').innerHTML = "You are dragging over the " + e.target.getAttribute('id');
    }

    function handleDragLeave(e) {
        block(e);
        _('app_status').innerHTML = "You left the " + e.target.getAttribute('id');
    }

    function handleDragDrop(e) {
        block(e);
        var element_id = e.dataTransfer.getData("text");
        e.target.appendChild(_(element_id));
//        _(element_id).removeAttribute("draggable")
        _(element_id).style.cursor = "default";
        droppedIn = true;
        _('app_status').innerHTML = "You droped " + element_id + " onto " + e.target.getAttribute('id');
    }

    // Draggable element functionality
    var object1 = _('object1');
    var object2 = _('object2');
    var object3 = _('object3');

    var activeEvent = '';

    object1.addEventListener('dragstart', handleDragStart, false);
    object1.addEventListener('dragend', handleDragEnd, false);
    object1.addEventListener('touchstart', handleTouchStart, false);
    object1.addEventListener('touchmove', handleTouchMove, false);
    object1.addEventListener('touchend', handleTouchEnd, false);

    object2.addEventListener('dragstart', handleDragStart, false);
    object2.addEventListener('dragend', handleDragEnd, false);
    object2.addEventListener('touchstart', handleTouchStart, false);
    object2.addEventListener('touchmove', handleTouchMove, false);
    object2.addEventListener('touchend', handleTouchEnd, false);

    object3.addEventListener('dragstart', handleDragStart, false);
    object3.addEventListener('dragend', handleDragEnd, false);
    object3.addEventListener('touchstart', handleTouchStart, false);
    object3.addEventListener('touchmove', handleTouchMove, false);
    object3.addEventListener('touchend', handleTouchEnd, false);

    function handleDragStart(e) {
        // block(e);
        _('app_status').innerHTML = "Dragging the element " + e.target.getAttribute('id');
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("text", e.target.getAttribute('id'));
    }

    function handleDragEnd(e) {
        block(e);
        if (droppedIn == false) {
            _('app_status').innerHTML = "You let the " + e.target.getAttribute('id') + " go.";
        }
        droppedIn = false;
    }

    function handleTouchStart(e) {
        block(e);
        _('app_status').innerHTML = "Touch start with element " + e.target.getAttribute('id');
        activeEvent = 'start';
    }

    function handleTouchMove(e) {
        block(e);
        var touchLocation = e.targetTouches[0];
        pageX = Math.round(touchLocation.clientX);
        pageY = Math.round(touchLocation.clientY);
        var dropText = "";
        if (detectDropOn(dropZone1, pageX, pageY)) {
            dropText = ", dropping on " + dropZone1.id;
        } else if (detectDropOn(dropZone2, pageX, pageY)) {
            dropText = ", dropping on " + dropZone2.id;
        }
        _('app_status').innerHTML = "Touch " + pageX + ", " + pageY + dropText;
        e.target.style.position = "absolute";
        var rect = e.target.getBoundingClientRect();
        e.target.style.left = (pageX - (rect.width / 2)) + "px";
        e.target.style.top = (pageY - (rect.height / 2)) + "px";
        activeEvent = 'move';
    }

    function handleTouchEnd(e) {
        block(e);
        if (activeEvent === 'move') {
            // var touchLocation = e.targetTouches[0]; // apparently this doesn't exist here
            var coordText = " at " + pageX + ", " + pageY;

            if (detectDropOn(dropZone1, pageX, pageY)) {
                appendDropOn(dropZone1, e.target, coordText);
            } else if (detectDropOn(dropZone2, pageX, pageY)) {
                appendDropOn(dropZone2, e.target, coordText);
            } else {
                e.target.style.position = "static";
                _('app_status').innerHTML = "You dropped " + e.target.getAttribute('id') + coordText;
            }
        }
    }
    
    function appendDropOn(dropZone, target, coordText) {
        dropZone.appendChild(target);
        target.style.position = "initial";
        droppedIn = true;
        _('app_status').innerHTML = "You dropped " + target.getAttribute('id') + " on " + dropZone.id + coordText;
    }

    function detectDropOn(zone, x, y) {
        var rect = zone.getBoundingClientRect();
        var x1 = rect.left;
        var y1 = rect.top;
        var x2 = rect.right;
        var y2 = rect.bottom;
        //Very simple detection here
        var returnvalue = false;
        if (x1 <= x && y1 <= y && x <= x2 && y <= y2) {
            returnvalue = true;
        }
        if (returnvalue) {
            console.log(`${zone.id}: ${x1} <= ${x} && ${y1} <= ${y} && ${x} <= ${x2} && ${y} <= ${y2}`);
        }
        return returnvalue;
    }
}
