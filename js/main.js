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
}

// DOM Tree Creation Function //

// function renderPost(obj) {
//   var $li = document.createElement('li');

//   var $divPost = document.createElement('div');
//   $divPost.setAttribute('class', 'post');
//   $li.appendChild($divPost);

//   var $divRow = document.createElement('div');
//   $divRow.setAttribute('class', 'row');
//   $divPost.appendChild($divRow);

//   var $divColumnHalf1 = document.createElement('div');
//   $divColumnHalf1.setAttribute('class', 'column-half');
//   $divRow.appendChild($divColumnHalf1);

//   var $imgPicture = document.createElement('img');
//   $imgPicture.setAttribute('src', obj.photoUrl);
//   $imgPicture.setAttribute('class', 'picture');
//   $divColumnHalf1.appendChild($imgPicture);

//   var $divColumnHalf2 = document.createElement('div');
//   $divColumnHalf2.setAttribute('class', 'column-half');
//   $divRow.appendChild($divColumnHalf2);

//   var $divTopic = document.createElement('div');
//   $divColumnHalf2.appendChild($divTopic);

//   var $h2Topic = document.createElement('h2');
//   $h2Topic.setAttribute('class', 'topic');
//   $divTopic.appendChild($h2Topic);

//   var $divContent1 = document.createElement('div');
//   $divColumnHalf2.appendChild($divContent1);

//   var $pContent1 = document.createElement('p');
//   $pContent1.setAttribute('class', 'content');
//   $divContent1.appendChild($pContent1);

//   var $divContent2 = document.createElement('div');
//   $divColumnHalf2.appendChild($divContent2);

//   var $pContent2 = document.createElement('p');
//   $pContent2.setAttribute('class', 'content');
//   $divContent2.appendChild($pContent2);

//   return $li;
// }
