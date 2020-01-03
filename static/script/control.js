var currentCount=0;
var pm;

var syncChildCount = function () {
    var container = document.getElementById("context");
    for (var i in container.children) {
        if (container.children[i].id != ("canvas" + currentCount+1)) {
            try {
                container.children[i].style = "display: none";
            } catch {}
        } else {
        }
    }
}

document.body.onload+= function(){
    syncChildCount();
    pm = new PreviewManager();
    Console.log(container.children);
    for (var i in container.children) {
        pm.createPreviewByIndex(i+1);
    }
}