document.querySelector("#itemPoolCheck").addEventListener("submit", event => {
  event.preventDefault();
  postData();
});

function getFormData() {
  var data = new FormData(document.querySelector("#fieldBoxes"));
  var checkboxArray = document.querySelectorAll("#itemPoolCheck input");
  var itemPoolArray = [];
  for (var i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray[i].checked) {
      itemPoolArray.push(checkboxArray[i].value);
    }
  }

  return {
    itemName: data.get("itemName"),
    id: data.get("id"),
    type: data.get("itemType"),
    collected: data.get("collectionStatus"),
    imgURL: data.get("imageURL"),
    itemPool: itemPoolArray
  };
}

function postData() {
  fetch("https://hidden-castle-51466.herokuapp.com/toAPI", {
    method: "post",
    body: JSON.stringify(getFormData()),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(response => response.json())
    .then(response => {
      document.querySelector("button").textContent = response;
      window.setTimeout(() => document.querySelector("button").textContent = "Submit", 3000);
    }).catch(console.error);
}

$(".button-collapse").sideNav();
$("select").material_select();
