var newResponse = [];

fetch("https://hidden-castle-51466.herokuapp.com/combinedData")
  .then(response => response.json())
  .then(response => {
    response.sort((a, b) => {
      return a.id - b.id;
    });
    newResponse.push(response);
    for (let i = 0; i < response.length; i++) {
      var aTag = document.createElement("a");
      var img = document.createElement("img");

      aTag.classList.add("modal-trigger");
      aTag.href = "#modal1";
      img.classList.add("itemPic");
      img.src = response[i].imgURL;
      img.alt = response[i].itemName;

      img.addEventListener("click", (event) => {
        for (let j = 0; j < newResponse[0].length; j++) {
          if (event.target.alt === newResponse[0][j].itemName) {
            document.querySelector("#itemName").textContent = newResponse[0][j].itemName + " - " + newResponse[0][j].id;
            document.querySelector("#itemType").textContent = "Type: " + newResponse[0][j].type;
            document.querySelector("#itemPool").textContent = "Pool: " + newResponse[0][j].itemPool.join(", ");
            document.querySelector("#itemDescription").textContent = "Description: " + newResponse[0][j].description;
            document.querySelector("#modalImg").src = newResponse[0][j].imgURL;
          }
        }
      });

      aTag.appendChild(img);
      document.querySelector("main").appendChild(aTag);
    }
  })
  .catch(err => console.log(err));


$(document).ready(function() {
  $(".modal").modal();
});

$(".button-collapse").sideNav();
