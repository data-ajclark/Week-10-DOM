class Recipe {
  constructor(name, link, rating) {
    this.name = name;
    this.link = link;
    this.rating = rating;
  }
}

class Type {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.recipes = [];
  }
  
  addRecipe(recipe) {
    this.recipes.push(recipe);
  }

  deleteRecipe(recipe) {
    let index = this.recipes.indexOf(recipe);
    this.recipes.splice(index, 1);
  }
}

let types = [];
let typeId = 0;

onClick('new-type', () => {
  types.push(new Type(typeId++, getValue('new-type-name')));
  drawDOM();
});

function onClick(id, action) {
  let element = document.getElementById(id);
  element.addEventListener('click', action);
  return element;
}

function getValue(id) {
  return document.getElementById(id).value;
}
function getNameValue(name) {
  // Get the value of the input via name attribute
  var ele = document.getElementsByName(name);
  //loop options
  for(i = 0; i < ele.length; i++) {
    if(ele[i].checked)
    return ele[i].value;
  }
}

function drawDOM() {
  let typeDiv = document.getElementById('types');
  clearElement(typeDiv);
  for (let type of types) {
    let table = createTypeTable(type);
    let title = document.createElement('h2');
    title.innerHTML = type.name;
    title.appendChild(createDeleteTypeButton(type));
    typeDiv.appendChild(title);
    typeDiv.appendChild(table);
    for (let recipe of type.recipes) {
      createRecipeRow(type, table, recipe);
    }
  }
}

function createRecipeRow(type, table, recipe) {
  let row = table.insertRow(2);
  row.insertCell().innerHTML = recipe.name;
  row.insertCell().innerHTML = recipe.link;
  if (recipe.rating === 'Up') {
    row.insertCell().innerHTML = '<i class="bi bi-hand-thumbs-up"></i>';
  }
  else {
    row.insertCell().innerHTML = '<i class="bi bi-hand-thumbs-down"></i>';
  }
  let actions = row.insertCell();
  actions.appendChild(createDeleteRowButton(type, recipe));
}

function createDeleteRowButton(type, recipe) {
  let btn = document.createElement('button');
  btn.className = 'btn btn-danger m-2';
  btn.innerHTML = 'Delete';
  btn.onclick = () => {
    let index = type.recipes.indexOf(recipe);
    type.recipes.splice(index, 1);
    drawDOM();
  };
  return btn;
}

function createDeleteTypeButton(type) {
  let btn = document.createElement('button');
  btn.className = 'btn btn-danger m-2';
  btn.innerHTML = 'Delete Type';
  btn.onclick = () => {
    let index = types.indexOf(type);
    types.splice(index, 1);
    drawDOM();
  };
  return btn;
}

function createNewRecipeButton(type) {
  let btn = document.createElement('button');
  btn.className = 'btn btn-danger';
  btn.innerHTML = 'Create';
  btn.onclick = () => {
    type.recipes.push(new Recipe(
      getValue(`name-input-${type.id}`), 
      getValue(`link-input-${type.id}`), 
      getNameValue(`rating-input-${type.id}`)
    ));
    drawDOM();
  };
  return btn;
}

function createTypeTable(type) {
  let table = document.createElement('table');
  table.setAttribute('class', 'table table-warning table-striped');

  // Create header row
  let row = table.insertRow(0);

  // Create header columns
  let nameColumn = document.createElement('th');
  let linkColumn = document.createElement('th');
  let ratingColumn = document.createElement('th');
  let createColumn = document.createElement('th');

  // Set header column content
  nameColumn.innerHTML = 'Name';
  linkColumn.innerHTML = 'Link';
  ratingColumn.innerHTML = 'Rating';

  // Add header columns to row
  row.appendChild(nameColumn);
  row.appendChild(linkColumn);
  row.appendChild(ratingColumn);
  row.appendChild(createColumn);

  // Create input row
  let formRow = table.insertRow(1);

  // Create input row columns
  let nameTh = document.createElement('th');
  let linkTh = document.createElement('th');
  let ratingTh = document.createElement('th');
  let createTh = document.createElement('th');

  // Create name input
  let nameInput = document.createElement('input');
  nameInput.setAttribute('id', `name-input-${type.id}`);
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('class', 'form-control');
  // Add input to column
  nameTh.appendChild(nameInput);

  // Create link input
  let linkInput = document.createElement('input');
  linkInput.setAttribute('id', `link-input-${type.id}`);
  linkInput.setAttribute('type', 'text');
  linkInput.setAttribute('class', 'form-control');
  // Add input to column
  linkTh.appendChild(linkInput);

  // Create rating input

  // Outline steps for creating input
  // create element of type "div"
  
  // Create container for radio buttons
  let radioDiv = document.createElement('div');
  radioDiv.setAttribute('class', 'form-check form-check-inline');

  // Create thumbs up button

  // create element of type "input"
  let radioInput = document.createElement('input');
  // set input id to "rating-input-{type.id}-up"
  radioInput.setAttribute('id', `rating-input-${type.id}-up`);
  // set input name to rating-{type.id}
  radioInput.setAttribute('name', `rating-input-${type.id}`);
  // set input type radio
  radioInput.setAttribute('type', 'radio');
  // set input class "btn-check"
  radioInput.setAttribute('class', 'btn-check');
  // set input value "?"
  radioInput.value='Up';
  // Add input to column
  radioDiv.appendChild(radioInput);

  // create element of type "label"
  let radioLabel = document.createElement('label');
  // set label for to "rating-input-{type.id}-up"
  radioLabel.setAttribute('for', `rating-input-${type.id}-up`);
  // set label class "btn btn-secondary"
  radioLabel.setAttribute('class', 'btn btn-danger');
  // set innerHTML to <i class="bi bi-hand-thumbs-up"></i>
  radioLabel.innerHTML='<i class="bi bi-hand-thumbs-up"></i>';
  // Add label to column
  radioDiv.appendChild(radioLabel);

  // Make another button for thumbs down

  // create element of type "input"
  let radioInput2 = document.createElement('input');
  // set input id to "rating-input-{type.id}-up"
  radioInput2.setAttribute('id', `rating-input-${type.id}-down`);
  // set input name to rating-{type.id}
  radioInput2.setAttribute('name', `rating-input-${type.id}`);
  // set input type radio
  radioInput2.setAttribute('type', 'radio');
  // set input class "btn-check"
  radioInput2.setAttribute('class', 'btn-check');
  // set input value "?"
  radioInput2.value='Down';
  // Add input to column
  radioDiv.appendChild(radioInput2);

  // create element of type "label"
  let radioLabel2 = document.createElement('label');
  // set label for to "rating-input-{type.id}-up"
  radioLabel2.setAttribute('for', `rating-input-${type.id}-down`);
  // set label class "btn btn-secondary"
  radioLabel2.setAttribute('class', 'btn btn-danger');
  // set innerHTML to <i class="bi bi-hand-thumbs-up"></i>
  radioLabel2.innerHTML='<i class="bi bi-hand-thumbs-down"></i>';
  // Add label to column
  radioDiv.appendChild(radioLabel2);
  // Add radio div grouo to rating cell
  ratingTh.appendChild(radioDiv);

  // Create recipe button
  let newRecipeButton = createNewRecipeButton(type);
  createTh.appendChild(newRecipeButton);

  // Add table header columns to row
  formRow.appendChild(nameTh);
  formRow.appendChild(linkTh);
  formRow.appendChild(ratingTh);
  formRow.appendChild(createTh);

  return table;
}

function clearElement(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
