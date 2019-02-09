var $noteList = $("#notes-list");
var $noteTitle = $("#note-title");
var $noteBody = $("#note-body");
var $submitBtn = $("#submit-btn");

// Gets all notes from the database, renders the notes list
var getAndRenderNotes = function() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function(data) {
    console.log(data);
    var $listItems = [];

    // Loop through and build a list item for each note returned from the db
    for (var i = 0; i < data.length; i++) {
      var note = data[i];
      var noteListItem = `<li class="list-group-item">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">${note.title}</h4>
          <p class="card-text">${note.body}</p>
          <a href="#" class="card-link"><i class="fas fa-edit"></i></a>
          <a href="#" class="card-link"><i class="fas fa-trash-alt"></i></a>
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


getAndRenderNotes();

$submitBtn.on("click", handleNoteSubmit);