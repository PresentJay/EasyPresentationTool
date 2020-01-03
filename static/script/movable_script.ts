import Moveable from "moveable";

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