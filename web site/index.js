const selectDecks = document.querySelector('.decks');
const get_composition = 'http://' + RESOLUME_ADDR + ':8080/api/v1/composition';
const table = document.querySelector('tbody');
const selected = table.getElementsByClassName('selected');
selectDecks.addEventListener('change', handleDeckSelect);
table.addEventListener('click',highlight);
document.querySelector("form").addEventListener('submit', handleSubmit);
let playlist = [
{item_name: '', preset_selector: '1', form_file: '',clip_index: '3'},
{item_name: '', preset_selector: '3', form_file: '',clip_index: '3'},
{item_name: '', preset_selector: '2', form_file: '',clip_index: '3'},
{item_name: '', preset_selector: '1', form_file: '',clip_index: '4'},
{item_name: '', preset_selector: '1', form_file: '',clip_index: '5'},

];

getRequest(get_composition);

buildPresets();

// ---------------- on load ---------------- //

function buildPresets(){
  
  const selectEl = document.createElement('select')
  selectEl.classList.add("form-select")
  selectEl.setAttribute("name", "preset_selector"); 

  let presetListHTML = '';
  let index = 1;
  for(const preset of presets){
    presetListHTML += `<option value=${index}>${preset}</option>`;
    index++
  }
  selectEl.innerHTML = presetListHTML;
  renderPresets(selectEl);
}

function renderPresets(selectEl){
  const presetDiv = document.querySelector('.presets_container');
  presetDiv.innerHTML = '';
  presetDiv.appendChild(selectEl);
}
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
  console.log(item); // {item_name: '', preset_selector: '', form_file: ''}
  //update_playlist_array
  //Cue media on resolume
  //Render table 
}

function updatePlaylistArr(item){
  
  for(item in playlist){

  }
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
  .catch(error => {
    alert(error)
  })

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
  selectEl.value = selectedDeck; // Set deck that active in Resolume
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