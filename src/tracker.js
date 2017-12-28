var newResponse = [];
var editStatus = false;
if (!localStorage.getItem("sortType")) {
  localStorage.setItem("sortType", "id");
}

document.querySelector("#id").addEventListener("click", () => {
  // event.stopPropagation();
  localStorage.setItem("sortType","id");
});

document.querySelector("#name").addEventListener("click", () => {
  // event.stopPropagation();
  localStorage.setItem("sortType","name");
});

document.querySelector("#edit").addEventListener("click", event => {
  event.preventDefault();
  document.querySelector("#edit").classList.toggle("black");
  document.querySelector("#edit").classList.toggle("red");
  if (editStatus === false) {
    editStatus = true;
  } else {
    editStatus = false;
  }
});

fetch("https://hidden-castle-51466.herokuapp.com/items")
  .then(response => response.json())
  .then(response => {
    if (localStorage.getItem("sortType") === "id") {
      response.sort((a, b) => {
        return a.id - b.id;
      });
    } else if (localStorage.getItem("sortType") === "name") {
      response.sort((a, b) => {
        if (a.itemName < b.itemName) {
          return -1;
        }
        if (a.itemName > b.itemName) {
          return 1;
        }
        return 0;
      });
    }
    newResponse.push(response);
    for (let i = 0; i < response.length; i++) {
      var aTag = document.createElement("a");
      var img = document.createElement("img");

      aTag.classList.add("modal-trigger");
      aTag.href = "#modal1";
      img.classList.add("itemPic");
      img.src = response[i].imgURL;
      img.alt = response[i].itemName;
      if (localStorage.getItem(response[i].itemName)) {
        response[i].collected = localStorage.getItem(response[i].itemName);
      }
      if (response[i].collected === "true") {
        img.classList.add("selected");
      }
      aTag.addEventListener("click", event => {
        if (editStatus === false) {
          for (let j = 0; j < newResponse[0].length; j++) {
            if (event.target.alt === newResponse[0][j].itemName) {
              document.querySelector("#itemName").textContent =
                newResponse[0][j].itemName + " - " + newResponse[0][j].id;
              document.querySelector("#itemType").textContent =
                "Type: " + newResponse[0][j].type;
              document.querySelector("#itemPool").textContent =
                "Pool: " + newResponse[0][j].itemPool.join(", ");
              document.querySelector("#itemDescription").textContent =
                "Description: " + newResponse[0][j].description;
              document.querySelector("#modalImg").src =
                newResponse[0][j].imgURL;
            }
          }
        } else {
          event.stopPropagation();
          event.target.classList.toggle("selected");
          !localStorage.getItem(event.target.alt) ||
          localStorage.getItem(event.target.alt) === "false"
            ? localStorage.setItem(event.target.alt, "true")
            : localStorage.setItem(event.target.alt, "false");
        }
      });

      aTag.appendChild(img);
      document.querySelector("main").appendChild(aTag);
    }
    // document.querySelector(".indeterminate").classList.add("displayNone");
  })
  .catch(err => console.log(err));

$(document).ready(function() {
  $(".modal").modal();
});

$(".button-collapse").sideNav();
