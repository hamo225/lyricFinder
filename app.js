// BUTTON TO GET A LIST OF SONGS THROUGH API
// DISPLAY LIST OF SONGS
// NEXT TO EACH SONG WILL BE A BUTTON TO GET THE LYRICS
// MAKE ANOTHER REQUEST TO THE API WITH THE ARTIST AND SONG NAME TO A PAGE WITH RETURN LYRICS

// API URL VARIABLE
const apiURL = "https://api.lyrics.ovh";

// GATHER ELEMENTS
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

// SEARCH BY SONG OR ARTIST
// Using .then
// function searchSongs(term) {
//   fetch(`${apiURL}/suggest/${term}`)
//     .then((res) => res.json()) //returns first promise which is the formatted data
//     .then((data) => {
//       //second promise will give the actual data
//       console.log(data);
//     });
// }

// will use the Fetch API and async await - function needs to be marked async
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`); //awaiting response from the fetch call
  const data = await res.json(); // parse the JSON data into JS objects and store in data variable
  console.log(data);

  //once have data need to display in browser - new function
  showData(data);
}

// SHOW SONG AND ARTIST IN DOM
function showData(data) {
  // take data which is an array of data and loop through and create a list item for each one
  //FIRST WAY TO DO THIS - USING FOREACH TO LOOP OVER
  //create empty variable output
  //   let output = "";

  //   data.data.forEach((song) => {
  //     output += `
  //     <li>
  //     <span><strong>
  //     ${song.artist.name} - ${song.title}
  //     </strong></span>
  //     <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">Get Lyrics</button>
  //     </li>`;
  //   });

  //   result.innerHTML = `<ul class="songs">
  //   ${output}
  //   </ul>`;

  //SECOND WAY TO DO THIS - USING MAP TO LOOP OVER AND THEN JOIN TO JOIN THE STRING

  result.innerHTML = `<ul class="songs">
    ${data.data
      .map((song) => {
        //must return on map method as returns a new element
        return `<li>
    <span><strong>
    ${song.artist.name} - ${song.title}
    </strong></span>
    <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">Get Lyrics</button> 
    </li>`;
      })
      .join("")}
    </ul>`;

  // If there are more pages of data in the return data object we need to add the buttons for them
  if (data.prev || data.next) {
    //if they exist then add to more innerhtml.
    //if prev is present then x if not y -ternary operator
    more.innerHTML = ` 
        ${
          data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
            : ""
        }
        ${
          data.next
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            : ""
        }
        `;
  } else {
    more.innerHTML = "";
  }
}

// GET PREV AND NEXT SONGS
async function getMoreSongs(url) {
  setTimeout(() => {}, 1000);
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`); //awaiting response from the fetch call
  const data = await res.json(); // parse the JSON data into JS objects and store in data variable
  console.log(data);

  //once have data need to display in browser - new function
  showData(data);
}

// EVENT HANDLERS
form.addEventListener("submit", (e) => {
  e.preventDefault(e); //must add so form submit does not refresh page

  //   Gather search term input value
  const searchTerm = search.value.trim();

  //   validation for form
  if (!searchTerm) {
    //if nothing entered on submit
    alert("sorry need a search term");
  } else {
    searchSongs(searchTerm); //if text then run this function
  }
});

// The get lyric buttons are generated through js after inital dom is loaded
// need to add the event listener on the parent element

// GET LYRICS BUTTON CLICK

result.addEventListener("click", (e) => {
  //   console.log(e.target); //this shows the clicked element
  const clickedEl = e.target;

  //   only if cliked on element with tagname button
  if (clickedEl.tagName === "BUTTON") {
    console.log(123);
  }
});
