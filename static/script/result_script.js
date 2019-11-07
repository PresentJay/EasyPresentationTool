var app = new Vue({
    el : '#app',
    data: {
        dragging : false,
        x : 'no',
        y : 'no'
    },
    methods: {
            startDrag(){
                this.dragging = true;
                this.x = this.y = 0;
            },
            stopDrag(){
                this.dragging = false;
                this.x = this.y = 'no';
            },
            doDrag(e){
                if(this.dragging)
                {
                    this.x = e.clientX;
                    this.y = e.clientY;
                }
            }
        },
        mounted(){
            window.addEventListener('mouseup',this.stopDrag);
        }
    }
);