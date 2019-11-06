var selectedTarget;

function MouseOver(e){
  selectedTarget = e.target.id;
  document.getElementById('addWord').style.display = 'inline-block';
  console.info('addWord style : '+document.getElementById('addWord').style.display);
}
function MouseLeave(e){
  selectedTarget = null;
  document.getElementById('addWord').style.display = 'none';
  console.info('addWord style : '+document.getElementById('addWord').style.display);
}
function addWord(e){
  var menu=document.getElementById('contextMenu');
  menu.style.display = 'block';
  menu.style.left = e.pageX;
  menu.style.right = e.pageY;
}