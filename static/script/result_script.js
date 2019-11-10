/**
 * @global 임시적으로 사용가능한 Target을 나타냄
 */
var selectedTarget;

/**
 * @global clickWord를 통해 선택된 word를 나타냄
 */
var selectedWord;
/**
 * @global Mouseover 이벤트가 진행중인 Container(슬라이드 섹션)를 나타냄
 */
var selectedContainer;


/**
 * @lastUpdate 19-11-10 / 00:11
 * @lastAuthor 정현재
 * @param {*} e 'event' object
 * @explain
 */
function MouseOver(e) {
  selectedTarget = e.currentTarget.children[1];
  selectedTarget.style.display = 'inline-block';
}

/**
 * @lastUpdate 19-11-10 / 00:11
 * @lastAuthor 정현재
 * @param {*} e 'event' object
 * @explain
 */
function MouseLeave(e) {
    e.currentTarget.children[1].style.display = 'none';
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
    sel.style.left = (tgRect.left + pageXOffset) + 'px';
    sel.style.top = (tgRect.bottom + pageYOffset) + 'px';
  }
}

/**
 * @lastUpdate 19-11-10 / 01:02
 * @lastAuthor 정현재
 * @param {*} e 'event' object
 * @explain Word 클릭 시 선택한 Element 하단으로 수정/삭제 컨텍스트메뉴(selection) 노출/제거
 *          스크롤된 페이지 계산 적용
 */
function clickWord(e) {
  clearContextMenu();
  var sel = document.getElementById('selection');
  selectedWord = e.target;
  if (sel.style.display == 'block') sel.style.display = 'none';
  else {
    sel.style.display = 'block';
    var tgRect = selectedWord.getBoundingClientRect();
    sel.style.left = (tgRect.left + pageXOffset) + 'px';
    sel.style.top = (tgRect.bottom + pageYOffset) + 'px';
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
    selectedTarget.parentNode.children[0].appendChild(childElement);
  }
  document.getElementById('textarea-word').value = "";
  document.getElementById('contextMenu').style.display = 'none';
}

function ContextCancelButtonClicked(e) {
  document.getElementById('contextMenu').style.display = 'none';
}

function allowDrop(ev) {
  // console.log("Target is " + ev.target);
  ev.preventDefault();
}

function drag(ev) {
  selectedWord = ev.target;
  // console.log(ev.target + " start.");
}

function drop(ev) {
  ev.preventDefault();
  if (ev.target != selectedWord) {
    ev.target.innerText += " " + selectedWord.innerText;
    selectedTarget.parentNode.children[0].removeChild(selectedWord);
    ReIndexing(selectedTarget);
  }
}

/**
 * @lastUpdate 19-11-09 / 20:37
 * @lastAuthor 정현재
 * @param {*} container
 * @explain {key} span을 wordContainer div로 재편입하면서, 전체적인 children관련 동작 변경
 *          children이 기본적으로 1개이기 때문에, 2개 이상일 때부터 인덱싱이 작동하도록 추가
 */
function ReIndexing(container) {
  if (container.children.length > 1) {
    for (var i = 1, item; item = container.children[i]; i++) {
      item.id = "word-" + (i + 1);
    }
  }
}

/**
 * @lastUpdate 19-11-09 / 20:22
 * @lastAuthor 정현재
 * @param {*} e 'event' object
 * @explain {key} span을 wordContainer div로 재편입하면서, 전체적인 children의 순서 조정
 */
function WordDeleteButtonClicked(e) {
  selectedTarget.parentNode.children[0].removeChild(selectedWord);
  ReIndexing(selectedTarget);
  document.getElementById('selection').style.display = 'none';
  clearContextMenu();
}

/**
 * @lastUpdate
 * @lastAuthor 임순길
 * @param {*} e 'event' object
 * @explain
 */
function ContainerMouseOver(e) {
  selectedContainer = e.currentTarget;
  selectedContainer.children[1].style.display = "inline-block";
  selectedContainer.children[2].style.display = "inline-block";
}
function ContainerMouseLeave(e) {
  selectedContainer.children[1].style.display = "none";
  selectedContainer.children[2].style.display = "none";
}

/**
 * @lastUpdate 19-11-09 / 20:25
 * @lastAuthor 정현재
 * @param {*} e 'event' object
 * @explain {key} span을 wordContainer div로 재편입하면서, 전체적인 children의 순서 조정 + id와 class가 겹치는 현상으로, id 제거
 */
function AddSentence(e) {
  clearContextMenu();
  var Sentence = document.createElement('div');
  Sentence.className = "container circleBehind";
  Sentence.addEventListener('mouseover', ContainerMouseOver, false);
  Sentence.addEventListener('mouseout', ContainerMouseLeave, false);

  var app = document.createElement('div');
  app.className = "object";
  app.addEventListener('mouseover', MouseOver, false);
  app.addEventListener('mouseout', MouseLeave, false);
  Sentence.appendChild(app);

  var wordContainer = document.createElement('div');
  wordContainer.id = "wordContainer";
  wordContainer.className = "wordContainer";
  app.appendChild(wordContainer);

  var spantag = document.createElement('span');
  spantag.className = "keyNumber";
  wordContainer.appendChild(spantag);

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
  slideContainer.insertBefore(Sentence, slideContainer.children[index+1]);
  ReIndexingContainter(slideContainer.children);
}

/**
 * @lastUpdate
 * @lastAuthor 임순길
 * @param {*} e 'event' object
 * @explain
 */
function DeleteSentence(e) {
  clearContextMenu();
  var slideContainer = document.getElementById('slideContainer');
  slideContainer.removeChild(selectedContainer);
  ReIndexingContainter(slideContainer.children);
}

/**
 * @lastUpdate 19-11-10 / 04:46
 * @lastAuthor 정현재
 * @param {*} e 'event' object
 * @explain {key} span을 wordContainer div로 재편입하면서, 전체적인 children의 순서 조정
 */
function ReIndexingContainter(container) {
  for (var i = 0, item; item = container[i]; i++) {
    item.id = "sentenceContainer-" + (i + 1);
    item.children[0].children[0].children[0].innerText = " Slide " + (i + 1) + " ";
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
  console.log(selectedWord + " mBClicked");
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
    mdT.value = '';
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
  console.log(selectedWord + " confirmed");
  if (mdT.value != '' && mdT.value != ' ') {
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

/**
 * @lastUpdate 19-11-10 / 12:00
 * @lastAuthor 조경원
 * @explain 트리구조로 나뉘어져 있는 키, 값들을 이중 배열로 다시 정리
 */
function makeArray() {
 var keyArray = [];
  var valueArray = [];
  var valueArray1 = [];
  var key = document.getElementById('slideContainer').children;
  var keylength = key.length;
  for(var i = 0; i < keylength; i++)
  {
    valueArray = [];
    for(var j = 1; j <= key[i].children[0].children[0].children.length-1; j++ )
    {

       valueArray.push(key[i].children[0].children[0].children[j].innerText);
     }
     valueArray1 = valueArray;
     keyArray.push(valueArray1);
  }
  console.log(keyArray);
}