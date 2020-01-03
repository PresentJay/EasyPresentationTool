(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const moveable = new Moveable(document.body, {
    // If you want to use a group, set multiple targets(type: Array<HTMLElement | SVGElement>).
    target: document.getElementsByClassName(".target"),
    draggable: true,
    throttleDrag: 0,
});

const frame = {
    translate: [0, 0],
};
moveable.on("dragStart", ({ set }) => {
    set(frame.translate);
}).on("drag", ({ target, beforeTranslate }) => {
    frame.translate = beforeTranslate;
    target.style.transform
        = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
}).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
    console.log("onDragEnd", target, isDrag);
});
},{}]},{},[1]);
