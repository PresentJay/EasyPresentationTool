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
<<<<<<< HEAD
  childElement.innerHTML = name;
  childElement.id = "word-"+selectedTarget.children.length;
=======
  childElement.innerText = name;
  childElement.id = "word-"+ (Number(selectedTarget.children.length)+1);
>>>>>>> 6b87014b1e88642a220b431703c8033d3612f24d
  childElement.draggable = "true";
  childElement.addEventListener('dragstart',drag,false);
  childElement.addEventListener('drop',drop,false);
  childElement.addEventListener('dragover',allowDrop,false);
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
  document.getElementById(ev.target.id).innerText += " " + document.getElementById(ev.dataTransfer.getData("Text")).innerText;
<<<<<<< HEAD
  document.getElementById("wordContainer").removeChild(document.getElementById(ev.target.id));
  console.log(ev.dataTransfer.getData("Text") + " is dragged and dropped to " + ev.target.id );
=======
  document.getElementById("wordContainer").removeChild(document.getElementById(ev.dataTransfer.getData("Text")));
  console.log(ev.dataTransfer.getData("Text") + " is dragged and dropped to " + ev.target.id );
  ReIndexing(document.getElementById('wordContainer'));
}
function ReIndexing(container){
  for(var i=0,item;item=container.children[i];i++){
    item.id = "word-"+(i+1);
  }
>>>>>>> 6b87014b1e88642a220b431703c8033d3612f24d
}