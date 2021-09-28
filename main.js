function _(id) {
    return document.getElementById(id);
}

var droppedIn = false;

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
    var originalX = '';
    var originalY = '';

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
        block(e);
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
        originalX = (e.target.offsetLeft - 10) + "px";
        originalY = (e.target.offsetTop - 10) + "px";
        activeEvent = 'start';
    }

    function handleTouchMove(e) {
        block(e);
        var touchLocation = e.targetTouches[0];
        var pageX = Math.round(touchLocation.pageX - 50) + "px";
        var pageY = Math.round(touchLocation.pageY - 50) + "px";
        _('app_status').innerHTML = "Touch " + pageX + ", " + pageY;
        e.target.style.position = "absolute";
        e.target.style.left = pageX;
        e.target.style.top = pageY;
        activeEvent = 'move';
    }

    function handleTouchEnd(e) {
        block(e);
        if (activeEvent === 'move') {
            var pageX = (parseInt(e.target.style.left) - 50);
            var pageY = (parseInt(e.target.style.top) - 50);

            if (detectDropOn(dropZone1, pageX, pageY)) {
                dropZone1.appendChild(e.target);
                e.target.style.position = "initial";
                droppedIn = true;
                _('app_status').innerHTML = "You droped " + e.target.getAttribute('id') + " onto " + dropZone1.id;
            } else if (detectDropOn(dropZone2, pageX, pageY)) {
                dropZone2.appendChild(e.target);
                e.target.style.position = "initial";
                droppedIn = true;
                _('app_status').innerHTML = "You droped " + e.target.getAttribute('id') + " onto " + dropZone2.id;
            } else {
                e.target.style.left = originalX;
                e.target.style.top = originalY;
                _('app_status').innerHTML = "You let the " + e.target.getAttribute('id') + " go.";
            }
        }
    }

    function detectDropOn(zone, x, y) {
        var x1 = zone.offsetLeft;
        var y1 = zone.offsetTop;
        var w = zone.offsetWidth;
        var h = zone.offsetHeight;
        //Very simple detection here
        if (x - x1 > w) 
            return false;
        if (y - y1 > h) 
            return false;
        return true;
    }

    function detectTouchEnd(x1, y1, x2, y2, w, h) {
        //Very simple detection here
        if (x2 - x1 > w) 
            return false;
        if (y2 - y1 > h) 
            return false;
        return true;
    }
}
