const selectDecks = document.querySelector('.decks');
selectDecks.addEventListener('change', handleDeckSelect);

const table = document.querySelector('table')
table.addEventListener('click',highlight);
const selected = table.getElementsByClassName('selected');

const get_composition = 'http://localhost:8080/api/v1/composition';
getRequest(get_composition);

function handleDeckSelect(event){
console.log(event.target.value)
postRequest('http://localhost:8080/api/v1/composition/decks/' + event.target.value + '/select');

}

function highlight(e) {
  if (selected[0]) selected[0].className = '';
  e.target.parentNode.className = 'selected';
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
  selectEl.classList.add("form-select", "form-select-sm", "mb-3")

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