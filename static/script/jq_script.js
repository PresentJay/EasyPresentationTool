$(document).click(function (e) {
    switch (e.target.className) {
        case 'word':
        case 'btn btn-success':
        case 'btn btn-danger':
        case 'btn btn-light':
        case 'btn btn-primary':
        case 'contextMenu':
        case 'keyNumber':
        case 'wordarea':
            return false;
        default:
            clearContextMenu();
            console.log(e.target.tagName + " : " + e.target.id + " : " + e.target.className + " is clicked : " + e.target.length);
            break;
    }
});