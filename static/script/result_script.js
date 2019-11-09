var selectedTarget;
var selectedWord;
var selectedContainer;

function MouseOver(e) {
  selectedTarget = e.currentTarget.children[1];
  e.currentTarget.children[2].style.display = 'inline-block';
}

function MouseLeave(e) {
  e.currentTarget.children[2].style.display = 'none';
}

/**
 * @lastUpdate 19-11-09 / 16:45
 * @lastAuthor 정현재
 * @param {*} e 'event' object
 * @explain 단어 추가버튼 클릭 시, 해당 위치 x,y에 바로 호출하면 컨텍스트의 포커스가 변경되어, 영역 감지가 힘들어짐
 *          해당 상황을 방지하고자 단어 추가 컨텍스트메뉴의 호출위치를 일정하게 잡음
 */
function addWord(e) {
  var sel = document.getElementById('contextMenu');
  clearContextMenu();
  if (sel.style.display == 'block') sel.style.display = 'none'; 
  else {
    sel.style.display = 'block';
    var tgRect = e.target.getBoundingClientRect();
    sel.style.left = (tgRect.left) + 'px';
    sel.style.top = (tgRect.bottom) + 'px';
  }
}


/**
 * @lastUpdate 19-11-08 / 20:45
 * @lastAuthor 정현재
 * @param {*} e 'event' object
 * @explain Word 클릭 시 선택한 Element 하단으로 수정/삭제 컨텍스트메뉴(selection) 노출/제거
 */
function clickWord(e) {
  var sel = document.getElementById('selection');
  selectedWord = e.target;
  if (sel.style.display == 'block') sel.style.display = 'none';
  else {
    sel.style.display = 'block';
    var tgRect = selectedWord.getBoundingClientRect();
    sel.style.left = (tgRect.left) + 'px';
    sel.style.top = (tgRect.bottom) + 'px';
  }
}

/**
 * @lastUpdate 19-11-09 / 11:27 
 * @lastAuthor 정현재
 * @param {*} e 'event' object
 * @explain word 추가 시, 빈 공간이 그대로 추가되는 현상에 관련하여 기초적인 유효성검사만 실행
 *          (차후 공백 제거 알고리즘 필요)
 */
function ContextButtonClicked(e) {
  var word = document.getElementById('textarea-word');
  if (word.value != '' && word.value != ' ') {
    var childElement = document.createElement('div');
    childElement.className = "word";
    childElement.innerText = word.value;
    childElement.id = "word-" + (Number(selectedTarget.children.length) + 1);
    childElement.draggable = "true";
    childElement.addEventListener('dragstart', drag, false);
    childElement.addEventListener('drop', drop, false);
    childElement.addEventListener('dragover', allowDrop, false);
    childElement.addEventListener('click', clickWord, false);
    selectedTarget.appendChild(childElement);
  }
  document.getElementById('textarea-word').value = "";
  document.getElementById('contextMenu').style.display = 'none';
}

function ContextCancelButtonClicked(e) {
  document.getElementById('contextMenu').style.display = 'none';
}

function allowDrop(ev) {
  console.log("Target is " + ev.target);
  ev.preventDefault();
}

function drag(ev) {
  selectedWord = ev.target;
  console.log(ev.target + " start.");
}

function drop(ev) {
  ev.preventDefault();
  if (ev.target != selectedWord) {
    ev.target.innerText += " " + selectedWord.innerText;
    selectedTarget.removeChild(selectedWord);
    ReIndexing(selectedTarget);
  }
}

function ReIndexing(container) {
  for (var i = 0, item; item = container.children[i]; i++) {
    item.id = "word-" + (i + 1);
  }
}

function WordDeleteButtonClicked(e) {
  selectedTarget.removeChild(selectedWord);
  ReIndexing(selectedTarget);
  document.getElementById('selection').style.display = 'none';
}

function ContainerMouseOver(e) {
  selectedContainer = e.currentTarget;
  console.log(selectedContainer.id);
  selectedContainer.children[1].style.display = "inline-block";
  selectedContainer.children[2].style.display = "inline-block";
}

function ContainerMouseLeave(e) {
  selectedContainer.children[1].style.display = "none";
  selectedContainer.children[2].style.display = "none";
}

function AddSentence(e) {
  clearContextMenu();
  var Sentence = document.createElement('div');
  Sentence.className = "container circleBehind";
  Sentence.addEventListener('mouseover', ContainerMouseOver, false);
  Sentence.addEventListener('mouseout', ContainerMouseLeave, false);

  var app = document.createElement('div');
  app.id = "app";
  app.className = "object";
  app.addEventListener('mouseover', MouseOver, false);
  app.addEventListener('mouseout', MouseLeave, false);
  Sentence.appendChild(app);

  var spantag = document.createElement('span');
  app.appendChild(spantag);

  var wordContainer = document.createElement('div');
  wordContainer.id = "wordContainer";
  wordContainer.className = "wordContainer";
  app.appendChild(wordContainer);


  var addButton = document.createElement('div');
  addButton.id = "addWord";
  addButton.innerText = "+";
  addButton.className = "btn btn-primary";
  addButton.addEventListener('mousedown', addWord, false);
  app.appendChild(addButton);

  var AddSentenceButton = document.createElement('div');
  AddSentenceButton.className = "btn btn-success";
  AddSentenceButton.innerText = "문장 추가";
  AddSentenceButton.style.display = "none";
  AddSentenceButton.addEventListener('click', AddSentence, false);
  AddSentenceButton.id = "SentenceAddButton";

  var DeleteSentenceButton = document.createElement('div');
  DeleteSentenceButton.className = "btn btn-danger";
  DeleteSentenceButton.innerText = "문장 삭제";
  DeleteSentenceButton.style.display = "none";
  DeleteSentenceButton.addEventListener('click', DeleteSentence, false);
  DeleteSentenceButton.id = "SentenceDeleteButton";

  Sentence.appendChild(AddSentenceButton);
  Sentence.appendChild(DeleteSentenceButton);

  var slideContainer = document.getElementById('slideContainer');
  var index = [].indexOf.call(slideContainer.children, selectedContainer);
  slideContainer.insertBefore(Sentence, slideContainer.children[index + 1]);
  ReIndexingContainter(slideContainer.children);

}

function DeleteSentence(e) {
  clearContextMenu();
  var slideContainer = document.getElementById('slideContainer');
  slideContainer.removeChild(selectedContainer);
  ReIndexingContainter(slideContainer.children);
}

function ReIndexingContainter(container) {
  for (var i = 0, item; item = container[i]; i++) {
    item.id = "sentenceContainer-" + (i + 1);
    item.children[0].children[0].innerText = (i + 1) + " :";
  }
}

/**
 * @date 19-11-08 / 23:14
 * @author 정현재
 * @param {*} e 'event' object
 * @explain 수정버튼 클릭 시, 수정할 input과 확인 버튼을 보이게 하고, 기존 수정버튼을
 *          취소버튼으로 변환하게 함
 */
function modifyButtonClicked(e) {
  var mdT = document.getElementById("modified-Text");
  var mdB = document.getElementById("word-Modify-Button")
  var mdDB = document.getElementById('word-Delete-confirmButton')
  var tg = document.getElementById(e.target.id);
  if (mdT.style.display == 'none') {
    mdT.style.display = "inline-block";
    mdB.style.display = "inline-block";
    tg.className = 'btn btn-danger';
    tg.innerText = '취소';
    mdDB.style.display = 'none';
  } else {
    mdT.style.display = 'none';
    mdB.style.display = 'none';
    tg.className = 'btn btn-light';
    tg.innerText = '수정';
    mdDB.style.display = 'inline-block';
  }
};

/**
 * @lastUpdate 19-11-08 / 23:27
 * @lastAuthor 정현재
 * @param {*} e 'event' object
 * @explain 수정 단계에서, 수정버튼 클릭 시 target의 innerText 변경
 */
function modifyConfirmButtonClicked(e) {
  var mdT = document.getElementById('modified-Text');
  if (mdT.value != '' || mdT.value != ' ') {
    selectedWord.innerText = mdT.value;
    mdT.value = '';
    clearContextMenu();
    document.getElementById('word-Modify-startButton').click();
  }
}

/**
 * @lastUpdate 19-11-08 / 11:37
 * @lastAuthor 정현재
 * @explain 열려 있는 contextMenu를 한 번에 정리해주는 함수
 */
function clearContextMenu() {
  var ctx_selection = document.getElementById('selection');
  var ctx_menu = document.getElementById('contextMenu');
  if (ctx_selection.style.display != 'none') ctx_selection.style.display = 'none';
  if (ctx_menu.style.display != 'none') ctx_menu.style.display = 'none';
}