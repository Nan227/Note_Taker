var $noteTitle = $("#note-title");
var $noteBody = $("#note-body");
var $submitBtn = $("#submit-btn");
var $noteList = $("#notesLocation");


// Gets notes from the database
var getAndRenderNotes = function() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function(data) {
    console.log(data);
    var $listItems = [];

    // Loop list item for each note from the db
    for (var i = 0; i < data.length; i++) {
      var note = data[i];
      var noteListItem = `<li class="list-group-item">
      <div class="card">
        <div class="card-body id=${note.id}>
          <h4 class="card-title">${note.title}</h4>
          <p class="card-text">${note.body}
          <a href="#" class="card-link"><i class="fas fa-edit noteEdit"></i></a>
          <a href="#" class="card-link"><i class="fas fa-trash-alt noteDelete"></i></a></p>
        </div>
      </div>
    </li>`;

      $listItems.push(noteListItem);
    }

    $noteList.empty();

    $noteList.append($listItems);
  });
};

// Submits the note from the form to the db
var handleNoteSubmit = function(event) {
  event.preventDefault();

  var note = {
    title: $noteTitle.val().trim(),
    body: $noteBody.val().trim()
  };

  if (!note.title || !note.body) {
    alert("Please fill out all the required fields!");
    return;
  }

  $.ajax({
    url: "/api/notes",
    method: "POST",
    data: note
  })
    .then(function() {
      getAndRenderNotes();
      $noteTitle.val("");
      $noteBody.val("");
    });
};

// Delete Btn on click

var handleClear = function(event){
  event.stopPropagation();

  var text = $(this).parents(".list-group-item").data();

  $.ajax({

    url: "/api/notes/" + text.id,
    method: "DELETE",
    data: note
  })
  .then(function() {
    getAndRenderNotes();
  });
};
// Edit Note

var handleEditNote = function(){
  var currentNote = $(this).data("note");
  $(this).children().hide();
  $(this).children("input.edit").val(currentNote.text);
  $(this).children("input.edit").show();
  $(this).children("input.edit").focus();

  
  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var note = $(this).parent().data("note");
    note.complete = !note.complete;
    updateNote(note);
  }
  function updateNote(note) {
    $.ajax({
      method: "PUT",
      url: "/api/notes",
      data: note
    }).then(getAndRenderNotes);
  }
}

getAndRenderNotes();

$submitBtn.on("click", handleNoteSubmit);
$noteEdit.on("click", ".fa-edit", handleEditNote);
$noteDelete.on("click", ".fa-trash-alt", handleClear);
