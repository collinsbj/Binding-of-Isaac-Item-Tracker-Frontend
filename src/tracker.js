var main = document.querySelector("main");

fetch("https://hidden-castle-51466.herokuapp.com/combinedData")
  .then(response => response.json())
  .then(response => {
    response.sort((a, b) => {
      return a.id - b.id;
    });
    for (var i = 0; i < response.length; i++) {
      var img = document.createElement("img");
      img.classList.add("itemPic");
      img.src = response[i].imgURL;
      img.alt = response[i].itemName;
      if (localStorage.getItem(response[i].itemName)) {
        response[i].collected = localStorage.getItem(response[i].itemName);
      }
      if (response[i].collected === "true") {
        img.classList.add("selected");
      }
      img.addEventListener("click", event => {
        event.target.classList.toggle("selected");

        !localStorage.getItem(event.target.alt) ||
        localStorage.getItem(event.target.alt) === "false"
          ? localStorage.setItem(event.target.alt, "true")
          : localStorage.setItem(event.target.alt, "false");
      });
      main.appendChild(img);
    }
  })
  .catch(err => console.log(err));

$(".button-collapse").sideNav();
