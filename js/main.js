/* global data */

// DOM Query Selectors //

var $entryTitle = document.querySelector('input.entry-title');
var $entryPhotoUrl = document.querySelector('input.entry-photo-url');
var $entryNotes = document.querySelector('.entry-notes');
var $entryImage = document.querySelector('img.entry-image');
var $form = document.forms[0];
var $journalForm = document.querySelector('.journal-form');
var $view = document.querySelectorAll('.view');
var $entriesLink = document.querySelector('.entries-link');
var $newlink = document.querySelector('.new-link');
var $saveButton = document.querySelector('.save-button');
var $noEntry = document.querySelector('.no-entry');
var $ul = document.querySelector('ul');
var $formHeaderText = document.querySelector('.form-header-text');
var $li = $ul.getElementsByTagName('li');
var $deleteLink = document.querySelector('.delete-link');
var $deleteLinkBox = document.querySelector('.form-actions-2');
var $overlay = document.querySelector('.overlay');
var $modal = document.querySelector('.modal');
var $cancel = document.querySelector('.cancel');
var $confirm = document.querySelector('.confirm');

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
  if ($formHeaderText.textContent === 'New Entry') {
    obj.title = $title;
    obj.photoUrl = $photoUrl;
    obj.notes = $notes;
    obj.EntryId = data.nextEntryId;
    document.forms[0].reset();
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    data.entries.unshift(obj);
    data.nextEntryId++;
    $ul.prepend(renderPost(obj));
  } else if ($formHeaderText.textContent === 'Edit Entry') {
    obj.title = $title;
    obj.photoUrl = $photoUrl;
    obj.notes = $notes;
    obj.EntryId = data.editing.EntryId;
    document.forms[0].reset();
    $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].EntryId === obj.EntryId) {
        data.entries.splice([i], 1, obj);
      }
    }
    for (var x = 0; x < $li.length; x++) {
      var string = $li[x].getAttribute('data-entry-id');
      var toNumber = Number(string);
      if (toNumber === obj.EntryId) {
        $li[x].replaceWith(renderPost(obj));
      }
    }
  }
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

function handleFormClear(event) {
  data.view = 'entry-form';
  $journalForm.reset();
  window.location.reload(false);
}

$newlink.addEventListener('click', handleFormClear);

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
        $formHeaderText.textContent = 'Edit Entry';
        $deleteLinkBox.className = 'form-actions-2';
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
    $entryTitle.setAttribute('value', data.editing.title);
    $entryPhotoUrl.setAttribute('value', data.editing.photoUrl);
    $entryImage.setAttribute('src', data.editing.photoUrl);
    $entryNotes.textContent = data.editing.notes;
  }
}

// Delete Entry Functionality //

$deleteLink.addEventListener('click', handleOpenModal);
$cancel.addEventListener('click', handleCancel);
$confirm.addEventListener('click', handleDelete);

function handleOpenModal(event) {
  if (event.target.matches('.delete-link')) {
    $overlay.className = 'overlay';
    $modal.className = 'modal';
  }
}

function handleCancel(event) {
  if (event.target.matches('.cancel')) {
    $overlay.className = 'overlay hidden';
    $modal.className = 'modal hidden';
  }
}

function handleDelete(event) {
  if (event.target.matches('.confirm')) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].EntryId === data.editing.EntryId) {
        data.entries.splice([i], 1);
      }
    }
    for (var x = 0; x < $li.length; x++) {
      var string = $li[x].getAttribute('data-entry-id');
      var toNumber = Number(string);
      if (toNumber === data.editing.EntryId) {
        delete $li[x];
      }
    }
  }
  $modal.className = 'modal hidden';
  $overlay.className = 'overlay hidden';
  data.view = 'entries';
  location.reload();
}
