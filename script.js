const input = document.querySelector(".search-header__input");
const searchIcon = document.querySelector(".search-header__icon");
const albumsContainer = document.querySelector(".albums-container");
const header = document.querySelector(".search-header");
const count = document.querySelector(".count");
const searchResultsDisplay = document.querySelector(
  ".search-header__results-display"
);
const countResult = document.querySelector(".result");
const albumTitleWrapper = document.querySelector(".album-title-wrapper");

// Sticky effect
window.onscroll = function () {
  scrollfunction();
};
const sticky = header.offsetTop;

function scrollfunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// Get Album when click the button or press enter

searchIcon.addEventListener("click", () => {
  const name = document.querySelector(".search-header__input").value;
  if (name === "") {
    alert("Please type the artist name");
  } else {
    let albumContent = document.querySelector(".albumContent");
    albumContent.innerHTML = `<div class="loader"></div>`;
    setTimeout(() => {
      getAlbums();
    }, 2000);
  }
});

input.addEventListener("keypress", (e) => {
  const name = document.querySelector(".search-header__input").value;
  if (e.key === "Enter") {
    if (name === "") {
      alert("Please type the artist name");
    }
    getAlbums();
  }
});

//transform string in to all lowercase letter
function lowerCaseName(string) {
  return string.toLowerCase();
}

// Fetch data
function getAlbums(event) {
  let albumContent = document.querySelector(".albumContent");
  albumContent.innerHTML = "<div></div>";
  const name = document.querySelector(".search-header__input").value;
  const artistName = lowerCaseName(name);

  fetch(
    `https://itunes.apple.com/search?term=${artistName}&media=music&entity=album&attribute=artistTerm&limit=200`
  )
    .then((response) => response.json())
    .then((data) => {
      albumTitleWrapper.innerHTML = "";
      countResult.innerHTML = `Result: ${data.results.length}`;
      data.results.forEach((album) => {
        let albumChildDiv = document.createElement("div");

        albumChildDiv.innerHTML = `<div class="single-album">

          <img
          src=${album.artworkUrl100}
          alt=${album.collectionName}
        />
        <p>${album.collectionName}<p>
        </div>`;
        albumContent.appendChild(albumChildDiv);
      });
    })
    .catch((err) => {
      console.log("Artist not found", err);
    });
}
