/* global data */

var $entryPhotoUrl = document.querySelector('input.entry-photo-url');
var $entryImage = document.querySelector('img.entry-image');
var $form = document.forms[0];

$entryPhotoUrl.addEventListener('input', handleUrlInput);
$form.addEventListener('submit', handleSubmit);

function handleUrlInput(event) {
  if ($entryPhotoUrl.value !== '') {
    $entryImage.setAttribute('src', $entryPhotoUrl.value);
  } else {
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
}

// Submit Entry Function //

function handleSubmit(event) {
  event.preventDefault();
  var obj = {};
  var $title = document.forms[0].elements.title.value;
  var $photoUrl = document.forms[0].elements.photoUrl.value;
  var $notes = document.forms[0].elements.notes.value;
  obj.title = $title;
  obj.photoUrl = $photoUrl;
  obj.notes = $notes;
  obj.EntryId = data.nextEntryId;
  document.forms[0].reset();
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.entries.unshift(obj);
  data.nextEntryId++;
  $formView.className = 'form-view hidden';
  $entriesView.className = 'entries-view';
}

// DOM Tree Creation Function //

function renderPost(obj) {
  var $li = document.createElement('li');

  var $divPost = document.createElement('div');
  $divPost.setAttribute('class', 'post');
  $li.appendChild($divPost);

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $divPost.appendChild($divRow);

  var $divColumnHalf1 = document.createElement('div');
  $divColumnHalf1.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumnHalf1);

  var $imgPicture = document.createElement('img');
  $imgPicture.setAttribute('src', obj.photoUrl);
  $imgPicture.setAttribute('class', 'picture');
  $divColumnHalf1.appendChild($imgPicture);

  var $divColumnHalf2 = document.createElement('div');
  $divColumnHalf2.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumnHalf2);

  var $divTopic = document.createElement('div');
  $divColumnHalf2.appendChild($divTopic);

  var $h2Topic = document.createElement('h2');
  $h2Topic.setAttribute('class', 'topic');
  $h2Topic.textContent = obj.title;
  $divTopic.appendChild($h2Topic);

  var $divContent1 = document.createElement('div');
  $divColumnHalf2.appendChild($divContent1);

  var $pContent1 = document.createElement('p');
  $pContent1.setAttribute('class', 'content');
  $pContent1.textContent = obj.notes;
  $divContent1.appendChild($pContent1);

  return $li;
}

var $ul = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', looper);

function looper(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var result = renderPost(data.entries[i]);
    $ul.prepend(result);
  }
}

var click = 0;

var $a = document.querySelector('a');
var $formView = document.querySelector('.form-view');
var $entriesView = document.querySelector('.entries-view');
var $buttonNew = document.querySelector('.new-button');
var $noContent = document.querySelector('.no-content-box');

$a.addEventListener('click', handleClick1);
$buttonNew.addEventListener('click', handleClick2);

function handleClick1(event) {
  click++;
  if (click > 0) {
    $formView.className = 'form-view hidden';
    $entriesView.className = 'entries-view';
  }
  click = 0;
}

function handleClick2(event) {
  click++;
  if (click > 0) {
    $formView.className = 'form-view';
    $entriesView.className = 'entries-view hidden';
  }
  click = 0;
}

if (localStorage !== null) {
  $noContent.className = 'no-content-box hidden';
} else if (localStorage === null) {
  $noContent.className = 'no-content-box';
}
