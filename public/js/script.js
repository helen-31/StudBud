//this is the javascript code for the kanban board. Starts off by setting the boarder colour for the new task as yellow. 
$(document).ready(function() {
  let color = "#ffeb3b";
  colorBorder();

  // Render bottom border for input field
  function colorBorder() {
    $("input[type=text]").css("border-bottom", "2px solid" + color + "");
  }

  // Here a function is created to define the card with parameters for the colour and the text. it returnes a box (div) with a background colour, and the text which is input. 
  function card(color, text) {
    return (
      `<div class="kanban-card d-flex flex-column" style="background-color:` +
      color +
      `">
            <p>` +
      text +
      `</p>
            <button>
                <span class="oi oi-x"></span>
            </button>
        </div>`
    );
  }

  // Add new card. creating a keypress function in which another function is called. It saids that when text it typed and confirmed then the a
  $("input[type=text]").keypress(function(event) {
    if (event.which === 13) {
      let text = $(this).val();
      $(this).val("");
      $(this)
        .next(".list-body")
        .append(card(color, text));
    }
  });

  // Delete card
  $(document).on("click", ".kanban-card > button", function() {
    $(this)
      .parent()
      .fadeOut(250, function() {
        $(this).remove();
      });
  });

  // Toggle input field
  $("header").on("click", "button", function() {
    $(this)
      .children()
      .toggleClass("oi-chevron-top oi-chevron-bottom");
    $("input[type=text]").slideToggle();
  });

  // Toggle chosen color
  $(".color").on("click", function() {
    color = $(this).val();
    $(".oi-check").removeClass("oi-check");
    colorBorder();
    $(this)
      .children()
      .addClass("oi-check");
  });

  $(function() {
    $("#sortable1, #sortable2, #sortable3")
      .sortable({
        connectWith: ".list-body"
      })
      .disableSelection();
  });
});
