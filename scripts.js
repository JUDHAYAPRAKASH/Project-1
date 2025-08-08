<script>
  var API_ENDPOINT = "https://8zrimq3jdb.execute-api.ap-south-1.amazonaws.com/prod";
  document.getElementById("savemessage").onclick = function () {
    var currentDate = new Date();
    var formattedDate = currentDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    var inputData = {
      message: $("#msg").val(),
      firstName: $("#fname").val(),
      lastName: $("#lname").val(),
      date: formattedDate,
    };
    $.ajax({
      url: API_ENDPOINT,
      type: "POST",
      data: JSON.stringify(inputData),
      contentType: "application/json; charset=utf-8",
      success: function () {
        document.getElementById("messageSaved").innerHTML = "Message Saved!";
        $("#msg").val("");
        $("#fname").val("");
        $("#lname").val("");
      },
      error: function () {
        alert("Error saving message.");
      },
    });
  };
  document.getElementById("getmessages").onclick = function () {
    $.ajax({
      url: API_ENDPOINT,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        $("#showMessages").empty();
        $.each(response, function (i, data) {
          var messageCardHtml =
            '<div class="messageCard">' +
            '<div class="messageContent">' + data["msg"] + '</div>' +
            '<div class="messageDetail">From: ' + data["firstName"] + ' ' + data["lastName"] + ' on ' + data["date"] + '</div>' +
            '</div>';
          $("#showMessages").append(messageCardHtml);
        });
      },
      error: function () {
        alert("Error fetching messages.");
      },
    });
  };
</script>