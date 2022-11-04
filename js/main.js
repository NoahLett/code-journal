/* global data */

// DOM Query Selectors //

var $entryPhotoUrl = document.querySelector('input.entry-photo-url');
var $entryImage = document.querySelector('img.entry-image');
var $form = document.forms[0];
var $view = document.querySelectorAll('.view');
var $entriesLink = document.querySelector('.entries-link');
var $newlink = document.querySelector('.new-link');
var $saveButton = document.querySelector('.save-button');
var $noEntry = document.querySelector('.no-entry');
var $ul = document.querySelector('ul');

$entryPhotoUrl.addEventListener('input', handleUrlInput);
$form.addEventListener('submit', handleSubmit);

// Image URL Placeholder Function //

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
  $ul.prepend(renderPost(obj));
}

// DOM Tree Creation Function //

function renderPost(obj) {
  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', obj.EntryId);

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
  $divTopic.setAttribute('class', 'row');
  $divColumnHalf2.appendChild($divTopic);

  var $divTopicThreeFourths = document.createElement('div');
  $divTopicThreeFourths.setAttribute('class', 'column-three-fourths');
  $divTopic.appendChild($divTopicThreeFourths);

  var $h2Topic = document.createElement('h2');
  $h2Topic.setAttribute('class', 'topic');
  $h2Topic.textContent = obj.title;
  $divTopicThreeFourths.appendChild($h2Topic);

  var $divTopicOneFourth = document.createElement('div');
  $divTopicOneFourth.setAttribute('class', 'column-one-fourth pen-box');
  $divTopic.appendChild($divTopicOneFourth);

  var $iPen = document.createElement('i');
  $iPen.setAttribute('class', 'fa-solid fa-pen');
  $iPen.setAttribute('data-view', 'entry-form');
  $iPen.setAttribute('data-entry-id', obj.EntryId);
  $divTopicOneFourth.appendChild($iPen);

  var $divContent1 = document.createElement('div');
  $divColumnHalf2.appendChild($divContent1);

  var $pContent1 = document.createElement('p');
  $pContent1.setAttribute('class', 'content');
  $pContent1.textContent = obj.notes;
  $divContent1.appendChild($pContent1);

  return $li;
}

function looper(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var result = renderPost(data.entries[i]);
    $ul.prepend(result);
  }
}

// View Swapping Functionality //

$form.addEventListener('submit', handleContentSwap);

function handleContentSwap(event) {
  if (data.entries.length === 0) {
    $noEntry.className = 'no-entry';
  } else {
    $noEntry.className = 'no-entry hidden';
  }
}

function handleViewSwap(string) {
  data.view = string;
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === string) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
}

$newlink.addEventListener('click', function (event) {
  handleViewSwap(event.target.getAttribute('data-view'));
});

$entriesLink.addEventListener('click', function (event) {
  handleViewSwap(event.target.getAttribute('data-view'));
});

$saveButton.addEventListener('click', function (event) {
  handleViewSwap(event.target.getAttribute('data-view'));
});

window.addEventListener('DOMContentLoaded', function (event) {
  looper();
  handleViewSwap(data.view);
  handleContentSwap();
});

$ul.addEventListener('click', handleEditorSwap);

function handleEditorSwap(event) {
  data.view = 'entry-form';
  if (event.target.matches('i')) {
    for (var x = 0; x < $view.length; x++) {
      if ($view[x].getAttribute('data-view') === 'entry-form') {
        $view[x].className = 'view';
      } else {
        $view[x].className = 'view hidden';
      }
    }
  }
}

// Entry Editing Functionality //

$ul.addEventListener('click', assignEdit);

function assignEdit(event) {
  if (event.target.matches('i')) {
    for (var i = 0; i < data.entries.length; i++) {
      var string = event.target.getAttribute('data-entry-id');
      var toNumber = Number(string);
      if (data.entries[i].EntryId === toNumber) {
        data.editing = data.entries[i];
      }
    }
  }
}
