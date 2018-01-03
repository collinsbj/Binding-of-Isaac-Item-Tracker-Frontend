var newResponse = [];
var editStatus = false;
if (!localStorage.getItem("sortType")) {
  localStorage.setItem("sortType", "id");
}

document.querySelector("#id").addEventListener("click", () => {
  localStorage.setItem("sortType", "id");
});

document.querySelector("#name").addEventListener("click", () => {
  localStorage.setItem("sortType", "name");
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
          var itemPoolLi = document.querySelectorAll("#itemPool ul li");
          var descriptionLi = document.querySelectorAll(
            "#itemDescription ul li"
          );

          for (let k = 0; k < itemPoolLi.length; k++) {
            document.querySelector("#itemPool ul").removeChild(itemPoolLi[k]);
          }

          for (let k = 0; k < descriptionLi.length; k++) {
            document
              .querySelector("#itemDescription ul")
              .removeChild(descriptionLi[k]);
          }

          for (let j = 0; j < newResponse[0].length; j++) {
            if (event.target.alt === newResponse[0][j].itemName) {
              document.querySelector("#itemName").textContent =
                newResponse[0][j].itemName;
              document.querySelector("#flavorText").textContent = `"${
                newResponse[0][j].flavorText
              }"`;
              document.querySelector("#itemId").textContent = `ID: ${
                newResponse[0][j].id
              }`;
              document.querySelector("#itemType").textContent = `Type: ${
                newResponse[0][j].type
              }`;

              for (let l = 0; l < newResponse[0][j].itemPool.length; l++) {
                let newLi = document.createElement("li");
                newLi.textContent = newResponse[0][j].itemPool[l];
                document.querySelector("#itemPool ul").appendChild(newLi);
              }

              for (let l = 0; l < newResponse[0][j].description.length; l++) {
                let newLi = document.createElement("li");
                newLi.textContent = newResponse[0][j].description[l];
                document
                  .querySelector("#itemDescription ul")
                  .appendChild(newLi);
              }

              document.querySelector("#modalImg").src =
                newResponse[0][j].imgURL;

              if (!newResponse[0][j].unlock) {
                document.querySelector("#unlock").classList.add("displayNone");
              } else {
                document
                  .querySelector("#unlock")
                  .classList.remove("displayNone");
                document.querySelector(
                  "#unlock"
                ).textContent = `Unlock Condition: ${newResponse[0][j].unlock}`;
              }

              if (!newResponse[0][j].transformation) {
                document
                  .querySelector("#transformation")
                  .classList.add("displayNone");
              } else {
                document
                  .querySelector("#transformation")
                  .classList.remove("displayNone");
                document.querySelector(
                  "#transformation"
                ).textContent = `Transformation: ${
                  newResponse[0][j].transformation
                }`;
              }

              if (!newResponse[0][j].recharge) {
                document
                  .querySelector("#recharge")
                  .classList.add("displayNone");
              } else {
                document
                  .querySelector("#recharge")
                  .classList.remove("displayNone");
                document.querySelector("#recharge").textContent = `Recharge: ${
                  newResponse[0][j].recharge
                }`;
              }
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

      localStorage.setItem("team1", ["Goku", "Vegeta"])

      aTag.addEventListener("mouseover", event => {
        document.querySelector("#leftPaneUl").classList.remove("displayNone");
        var itemPoolLiLeft = document.querySelectorAll("#itemPoolLeft ul li");
        var descriptionLiLeft = document.querySelectorAll(
          "#itemDescriptionLeft ul li"
        );

        for (let k = 0; k < itemPoolLiLeft.length; k++) {
          document
            .querySelector("#itemPoolLeft ul")
            .removeChild(itemPoolLiLeft[k]);
        }

        for (let k = 0; k < descriptionLiLeft.length; k++) {
          document
            .querySelector("#itemDescriptionLeft ul")
            .removeChild(descriptionLiLeft[k]);
        }

        for (let j = 0; j < newResponse[0].length; j++) {
          if (event.target.alt === newResponse[0][j].itemName) {
            document.querySelector("#itemNameLeft").textContent =
              newResponse[0][j].itemName;
            document.querySelector("#flavorTextLeft").textContent = `"${
              newResponse[0][j].flavorText
            }"`;
            document.querySelector("#itemIdLeft").textContent = `ID: ${
              newResponse[0][j].id
            }`;
            document.querySelector("#itemTypeLeft").textContent = `Type: ${
              newResponse[0][j].type
            }`;

            for (let l = 0; l < newResponse[0][j].itemPool.length; l++) {
              let newLi = document.createElement("li");
              newLi.textContent = newResponse[0][j].itemPool[l];
              document.querySelector("#itemPoolLeft ul").appendChild(newLi);
            }

            for (let l = 0; l < newResponse[0][j].description.length; l++) {
              let newLi = document.createElement("li");
              newLi.textContent = newResponse[0][j].description[l];
              document
                .querySelector("#itemDescriptionLeft ul")
                .appendChild(newLi);
            }

            document.querySelector("#modalImgLeft").src =
              newResponse[0][j].imgURL;

            if (!newResponse[0][j].unlock) {
              document
                .querySelector("#unlockLeft")
                .classList.add("displayNone");
            } else {
              document
                .querySelector("#unlockLeft")
                .classList.remove("displayNone");
              document.querySelector(
                "#unlockLeft"
              ).textContent = `Unlock Condition: ${newResponse[0][j].unlock}`;
            }

            if (!newResponse[0][j].transformation) {
              document
                .querySelector("#transformationLeft")
                .classList.add("displayNone");
            } else {
              document
                .querySelector("#transformationLeft")
                .classList.remove("displayNone");
              document.querySelector(
                "#transformationLeft"
              ).textContent = `Transformation: ${
                newResponse[0][j].transformation
              }`;
            }

            if (!newResponse[0][j].recharge) {
              document
                .querySelector("#rechargeLeft")
                .classList.add("displayNone");
            } else {
              document
                .querySelector("#rechargeLeft")
                .classList.remove("displayNone");
              document.querySelector(
                "#rechargeLeft"
              ).textContent = `Recharge: ${newResponse[0][j].recharge}`;
            }
          }
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
