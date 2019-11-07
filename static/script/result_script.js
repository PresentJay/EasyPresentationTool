var selectedTarget;

function MouseOver(e){
  selectedTarget = e.currentTarget.children[0];
  e.currentTarget.children[1].style.display = 'inline-block';
}
function MouseLeave(e){
  e.currentTarget.children[1].style.display = 'none';
}
function addWord(e){
  var menu=document.getElementById('contextMenu');
  menu.style.display = 'block';
  menu.style.position = 'absolute';
  menu.style.left = e.pageX+'px';
  menu.style.top = e.pageY+'px';
  console.info('clicked X : ' + e.pageX);
  console.info('clicked Y : ' + e.pageY);
}
function ContextButtonClicked(e){
  var name = document.getElementById('textarea-word').value;
  document.getElementById('textarea-word').value="";
  var childElement = document.createElement('div');
  childElement.style.fontSize = "20px";
  childElement.style.fontWeight ="bold";
  childElement.style.display ='inline-block';
  childElement.style.background = '#FFFFFF';
  childElement.style.border= "1px solid #FF0000";
  childElement.style.paddingTop = "5px";
  childElement.style.paddingBottom = "5px";
  childElement.style.paddingLeft = "10px";
  childElement.style.paddingRight = "10px";
  childElement.style.marginRight = "10px";
  childElement.innerHTML = name;
  childElement.id = "word-"+selectedTarget.children.length;
  childElement.addEventListener('ondragstart',drag(event));
  childElement.addEventListener('ondrop',drop(event));
  childElement.addEventListener('ondragover',allowDrop(event));
  selectedTarget.appendChild(childElement);
  document.getElementById('contextMenu').style.display = 'none';
}
function ContextCancelButtonClicked(e){
  document.getElementById('contextMenu').style.display = 'none';
}
function allowDrop(ev){
  console.log("Target is " + ev.target.id);
  ev.preventDefault();
}
function drag(ev){
  ev.dataTransfer.setData("Text", ev.target.id);
  console.log(ev.target.id + " start." );
}
function drop(ev){
  ev.preventDefault();
  document.getElementBy(ev.target.id).innerText += " " + document.getElementById(ev.dataTransfer.getData("Text")).innerText;
  document.getElementById("container").removeChild(document.getElementById(ev.target.id));
  console.log(ev.dataTransfer.getData("Text") + " is dragged and dropped to " + ev.target.id );
}