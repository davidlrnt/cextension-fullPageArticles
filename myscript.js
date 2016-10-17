var counter = 0
var all;
var modal;
var focusedClass = "ce-a100w-focus-element";
var mouseOver = function(evt){addClass(evt.target, focusedClass)};
var mouseOut = function (evt){removeClass(evt.target, focusedClass)};
var click = function (evt){openModal(evt.target)};
var keyDown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
    	removeClass(evt.target, focusedClass)
     	removeEventListeners(all)
     	counter++
    }
};

var addClass = function(elem, className) {
	elem.className += " " + className;
}

var removeClass = function(elem, className) {
	var re = new RegExp(className, 'g');
	elem.className = elem.className.replace(re, '')
}

var addEventListeners = function(elements) {
	for (var i=0, max=elements.length; i < max; i++) {
	  elements[i].addEventListener('mouseover', mouseOver)
	  elements[i].addEventListener('mouseout', mouseOut)
	  elements[i].addEventListener('click', click)
	}
}

var removeEventListeners = function(elements){
	for (var i=0, max=elements.length; i < max; i++) {
		elements[i].removeEventListener('mouseover', mouseOver);
		elements[i].removeEventListener('mouseout', mouseOut);
		elements[i].removeEventListener('click', click);
	}
}

var openModal = function(element){
	var focused = document.getElementsByClassName(focusedClass)
  for (var i=0, max=focused.length; i < max; i++) {
  	if (focused[i]) {
  		removeClass(focused[i], focusedClass)
  	}
	}
	var clone = element.cloneNode(true)
	modal = document.createElement("div");
	var button = document.createElement("button");
	var t = document.createTextNode("Close");
	button.appendChild(t);
	button.className = "ce-modal-100-closebtn"
	button.onclick = closeModal; 
	modal.className = "ce-modal-100";
	modal.appendChild(button);
	modal.appendChild(clone); 
	document.body.appendChild(modal);
	removeEventListeners(all)

  counter++
}

var closeModal = function(){
	modal.parentNode.removeChild(modal);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	counter ++;
    	all = document.getElementsByTagName("*");

    	if(counter%2==1) {
    		addEventListeners(all);
				document.addEventListener('keydown', keyDown)
			} else {
				removeEventListeners(all)
				document.removeEventListener('keydown', keyDown)

			}
    }
  }
);