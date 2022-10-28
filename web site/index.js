const selectDecks = document.querySelector('.decks');
const get_composition = 'http://' + RESOLUME_ADDR + ':8080/api/v1/composition';
const table = document.querySelector('tbody');
const selected = table.getElementsByClassName('selected');
selectDecks.addEventListener('change', handleDeckSelect);
table.addEventListener('click',highlight);
document.querySelector("form").addEventListener('submit', handleSubmit);
let playlist = [];

getRequest(get_composition);

// ---------------- add to form ---------------- //

function handleSubmit(event){
    event.preventDefault();
    const newItem = parseFormData(event);
    event.target.reset();
    addToPlaylist(newItem);
}

function parseFormData(event){
  const formData = new FormData(event.target);
  const newItem = {};
  for (const [key, value] of formData) {
    if(key == "form_file"){newItem[key] = value.name;} // handle file obj and parse its name
    else{ newItem[key] = value; }
  }
  return newItem;
}

function addToPlaylist(item){
  console.log(item);
  //update_playlist_array
  //Cue media on resolume
  //Render table 
}
// ---------------- table selection ---------------- //
function highlight(e) {
  
  if(e.target.parentNode.nodeName != "TABLE"){ //all rows select bug handler
    
    if (selected[0]) { // handle first selection, while select class doen't assign 
      selected[0].className = '';
    } 
    
    e.target.parentNode.className = 'selected';
  
  }

}

// ---------------- Deck selection ---------------- //

function handleDeckSelect(event){
console.log(event.target.value)
postRequest('http://localhost:8080/api/v1/composition/decks/' + event.target.value + '/select');
}

function getRequest(url){
  fetch(url)
  .then((response) => response.json())
  .then((data) => compositionParser(data))
}

function compositionParser(composition){
  const decks = [];
  let selectedDeck;
  let index = 1;

  for(const deck of composition.decks){ 
    decks.push(deck.name.value)
    if(deck.selected.value){selectedDeck = index} //findout selected deck
    index++; 
  }

buildDecks(decks, selectedDeck);

}

function buildDecks(decks, selectedDeck){
  
  //Create select el + add classes
  const selectEl = document.createElement('select')
  selectEl.classList.add("form-select")

  let deckListHTML = '';
  let index = 1;
  for(const deck of decks){
    deckListHTML += `<option value=${index}>${deck}</option>`;
    index++
  }
  selectEl.innerHTML = deckListHTML;
  selectEl.value = selectedDeck;
  console.log("index = : " + selectedDeck)
  renderDecks(selectEl);

}

function renderDecks(selectEl){
  const selectionsDiv = document.querySelector('.decks');
  selectionsDiv.innerHTML = '';
  selectionsDiv.appendChild(selectEl);
}

function postRequest(url){

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    console.log(this.responseText);
  }
  xhttp.open("POST", url);
  xhttp.send();
}





// var toggler = document.getElementsByClassName("caret");
// var i;

// for (i = 0; i < toggler.length; i++) {
//     toggler[i].addEventListener("click", function() {
//     this.parentElement.querySelector(".nested").classList.toggle("active");
//     this.classList.toggle("caret-down");
//   });
// }