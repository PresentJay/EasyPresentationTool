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
  selectedTarget.appendChild(childElement);
  document.getElementById('contextMenu').style.display = 'none';
}
function ContextCancelButtonClicked(e){
  document.getElementById('contextMenu').style.display = 'none';
}