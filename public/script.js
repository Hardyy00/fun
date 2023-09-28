function showList() {
  $("#list").empty();
  $.get("/data", function (data) {
    for (const user of data) {
      $("#list").append(
        `<li><h1>${user.user}</h1> <p>${user.comment}</p></li>`
      );
    }
  });
}

showList();

$("#btn").on("click", function () {
  const name = $("#name").val();
  const comment = $("#comment").val();

  $.post("/landing", { name, comment }, function (data) {
    console.log(data);
  });

  $("#name").val("");
  $("#comment").val("");

  showList();
});
