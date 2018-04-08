//POST a saved article
$("#save-btn").on("click", function(event) {
    console.log("Submit is working")
    var thisId = $(this).attr("data-id");
    var thisTitle = $(this).attr("data-title");

    $.ajax({
        method: "POST",
        url: "/saved/" + thisId,
        data: {
            title: thisTitle, 
            body: "test"
        }

        });
});