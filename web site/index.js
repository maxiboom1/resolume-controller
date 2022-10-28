const selectDecks = document.querySelector('.decks');
const get_composition = 'http://' + RESOLUME_ADDR + ':8080/api/v1/composition';
const table = document.querySelector('tbody');
const selected = table.getElementsByClassName('selected');
selectDecks.addEventListener('change', handleDeckSelect);
table.addEventListener('click',highlight);
document.querySelector("form").addEventListener('submit', handleSubmit);
let playlist = [];

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
// ---------------- add to playlist ---------------- //

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
  updatePlaylistArray(item);
  //Cue media on resolume
  //Render table 
}

function updatePlaylistArray(item){
  const clipPos = assignClipPosition(item);
  playlist.push({'item_name': item.item_name, 'preset_selector': item.preset_selector, 'form_file': item.form_file, 'clip_index': clipPos})
  postRequest('http://localhost:8080/api/v1/composition/layers/' + item.preset_selector + '/clips/' + clipPos + '/open', MEDIA_FOLDER + item.form_file);
}

function assignClipPosition(newItem){
  const indexesArr = [];
  let clip_index = 0;
  
  // run over playlist global arr, filter only current preset_selector,build new arr with clip_indexes
  for(const item of playlist){
    if(newItem.preset_selector == item.preset_selector){
      indexesArr.push(Number(item.clip_index));
      }
  }
  // If current preset (layer) was submitted first time - set it to start position
  if(indexesArr.length == 0){
    return CLIP_RANGE_START;
  }

  // find free media position
  for(let i = 0; i< indexesArr.length; i++){ 
    if (!indexesArr.includes(i+CLIP_RANGE_START)){
      clip_index = i+CLIP_RANGE_START; 
      break;
    }
  }
  // if array was without holes- assign last.pos+1 index (next one)
  if(clip_index == 0){
    clip_index = indexesArr[indexesArr.length-1] + 1;
  }
  
  return clip_index;

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

function postRequest(url, body = ''){

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    console.log(this.responseText);
  }
  xhttp.open("POST", url);
  xhttp.send(body);
}

// var toggler = document.getElementsByClassName("caret");
// var i;

// for (i = 0; i < toggler.length; i++) {
//     toggler[i].addEventListener("click", function() {
//     this.parentElement.querySelector(".nested").classList.toggle("active");
//     this.classList.toggle("caret-down");
//   });
// }