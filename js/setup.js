'use strict';

var colorsOfCoat = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var colorsOfEyes = ['black', 'red', 'blue', 'yellow', 'green'];
var colorsOfFireballs = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

document.querySelector('.setup-similar').classList.remove('hidden');

var similarWiz = document.querySelector('.setup-similar-list');
var wizardSample = document.querySelector('#similar-wizard-template').content;

var wizardCoat = wizardSample.querySelector('.wizard-coat');
var wizardEyes = wizardSample.querySelector('.wizard-eyes');
var wizardIdentity = wizardSample.querySelector('.setup-similar-label');

var fragment = document.createDocumentFragment();

var PERM_COUNT_OF_WIZZ = 4;

// создание на основе шаблона нового элемента (мага)
var drawWizards = function (arrOfWiz) {
  wizardIdentity.textContent = arrOfWiz.name;
  wizardCoat.style.fill = arrOfWiz.colorCoat;
  wizardEyes.style.fill = arrOfWiz.eyesColor;
  return wizardSample.cloneNode(true);
};

// вставляет фрагмент с отрисоваными магами из масива
var pasteWizards = function (hordeOfWiz) {
  for (var i = 0; i < PERM_COUNT_OF_WIZZ; i++) {
    fragment.appendChild(drawWizards(hordeOfWiz[window.randomInteger(0, hordeOfWiz.length - 1)]));
  }
  similarWiz.appendChild(fragment);
};

// -------------------------------------------------------------------------------------------------------------

var setupOpenElement = document.querySelector('.setup-open');
var setupElement = document.querySelector('.setup');
var setupCloseElement = document.querySelector('.setup-close');
var setupNameInput = document.querySelector('.setup-user-name');

function setupOpenClickHandler() {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', function (e) {
    if ((e.keyCode === 27) && (e.target !== setupNameInput)) {
      setupElement.classList.add('hidden');
    }
  });
  document.addEventListener('keydown', function (e) {
    if ((e.keyCode === 13) && (e.target === setupCloseElement)) {
      setupElement.classList.add('hidden');
    }
  });
}

function setupCloseClickHandler() {
  setupElement.classList.add('hidden');
}

function setupOpenKeydownHandler(e) {
  if (e.keyCode === 13) {
    setupElement.classList.remove('hidden');
  }
}

setupOpenElement.addEventListener('click', setupOpenClickHandler);
setupCloseElement.addEventListener('click', setupCloseClickHandler);
setupOpenElement.addEventListener('keydown', setupOpenKeydownHandler);

// -----------------------------------------------------------------------------------

setupNameInput.addEventListener('invalid', function () {
  if (setupNameInput.validity.tooShort) {
    setupNameInput.setCustomValidity('Имя персонажа не может содержать менее 2 символов');
  } else if (setupNameInput.validity.tooLong) {
    setupNameInput.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
  }
});

// ----------------------------------------------------------------------------------------

var wizardCoatElement = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyesElement = document.querySelector('.setup-wizard .wizard-eyes');
var fireballElement = document.querySelector('.setup-fireball-wrap');


wizardCoatElement.addEventListener('click', function () {
  window.changeColor(wizardCoatElement, colorsOfCoat);
});

wizardEyesElement.addEventListener('click', function () {
  window.changeColor(wizardEyesElement, colorsOfEyes);
});

fireballElement.addEventListener('click', function () {
  window.changeColor(fireballElement, colorsOfFireballs);
});

// ------------------------------------------------------------------------------------------------

var shopElement = document.querySelector('.setup-artifacts-shop');
var draggedItem = null;
var artifactsElement = document.querySelector('.setup-artifacts');

shopElement.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  }
  artifactsElement.style.outline = '2px dashed red';
});

shopElement.addEventListener('dragend', function () {
  artifactsElement.style.outline = '';
});


artifactsElement.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});

artifactsElement.addEventListener('drop', function (evt) {
  evt.target.style.background = '';
  evt.target.appendChild(draggedItem);
  artifactsElement.style.outline = '';
  evt.preventDefault();
});

artifactsElement.addEventListener('dragenter', function (evt) {
  evt.target.style.background = 'yellow';
  evt.preventDefault();
});

artifactsElement.addEventListener('dragleave', function (evt) {
  evt.target.style.background = '';
  evt.preventDefault();
});

// -------------------------------------------------------------------------------

var form = document.querySelector('.setup-wizard-form');

form.addEventListener('submit', function (e) {
  window.upload(new FormData(form), function () {
    setupElement.classList.add('hidden');
  });
  e.preventDefault();
});

var successHandler = function (wizards) {
  pasteWizards(wizards);
  setupElement.classList.remove('hidden');
};

var errorHandler = function (errorMessage) {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
};

window.load(successHandler, errorHandler);
