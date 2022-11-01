/* global data */
var nextEntryId = 0;

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
  nextEntryId++;
  var obj = {};
  var $title = document.forms[0].elements.title.value;
  var $photoUrl = document.forms[0].elements.photoUrl.value;
  var $notes = document.forms[0].elements.notes.value;
  obj.title = $title;
  obj.photoUrl = $photoUrl;
  obj.notes = $notes;
  obj.nextEntryId = nextEntryId;
  document.forms[0].reset();
  $entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  data.entries = obj;
}
