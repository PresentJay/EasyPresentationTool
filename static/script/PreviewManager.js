class PreviewManager {
  constructor() { // 생성자 (매개변수로 비디오 Id에 해당하는 string을 가져와야 함)
    // this.Previews = [];  // snapshot된 이미지 URI를 저장하는 배열
    this.container = document.getElementById("context").children;
    this.destination = document.getElementById("previewList");
    if (this.container != null) {
      this.iw = this.container[0].style.width;
      this.ih = this.container[0].style.height;
    }
  }

  remove(index) { // Previews 배열에 접근하여, 요소를 제거하는 함수
    this.Previews.splice(index, 1); // splice시 null 없이 index조정이 자동으로 진행됨 (index위치부터, 1의 크기만큼 제거)
  }

  createPreviewByIndex(index) {
    var canvas = document.createElement('canvas'); // 현재 frame 상단으로 빈 canvas를 생성
    canvas.width = this.iw; // canvas 초기 크기가 0이므로, 입력받은 해상도만큼 width, height를 조정
    canvas.height = this.ih;

    //canvas객체의 2d Contexts (초기상태: 빈공간)에 video DOM의 iw x ih 크기를 그려놓는다. (image형식)
    canvas.getContext('2d').drawImage(this.container[index], 0, 0, this.iw, this.ih);

    // 이미지 객체 생성 (입력받은 해상도 크기)
    var image = new Image(180, 180);

    // 이미지 소스를 canvas객체에서 DataURL화하여 부여한다.
    image.src = canvas.toDataURL("image/png");

    // 해당 이미지 소스를 배열에 append
    this.Previews.push(image.src);    
try{
    var tmpDiv = document.createElement("div");
    var previewList = document.getElementById("previewList");
    tmpDiv.id = "preview-"+index;
    tmpDiv.appendChild(image);
    console.log("append Succes - " + index + " : " + image.src);
}
catch{console.log("failed - " + index)}
  }

  getLength() {
    return this.Previews.length;
  }

  // Previews배열의 마지막 src를 반환
  getLastitem() {
    return this.Previews[getLength() - 1];
  }

  getContainerId() {
    return this.container;
  }

}