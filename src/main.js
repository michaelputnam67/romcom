
var bookCover = document.querySelector('.cover-image');
var bookTitle = document.querySelector('.cover-title');
var firstDescriptor = document.querySelector('.tagline-1');
var secondDescriptor = document.querySelector('.tagline-2');
var randomButton = document.querySelector('.random-cover-button');
var savedCoversSection = document.querySelector('.saved-covers-section');
var homeButton = document.querySelector('.home-button');
var makeNewButton = document.querySelector('.make-new-button');
var makeNewBookButton = document.querySelector('.create-new-book-button');
var saveCover = document.querySelector('.save-cover-button');
var savedCoversButton = document.querySelector('.view-saved-button');
var coverGlobal = document.querySelector('.user-cover');
var titleGlobal = document.querySelector('.user-title');
var descriptor1Global = document.querySelector('.user-desc1');
var descriptor2Global = document.querySelector('.user-desc2');

var savedCovers = [
  new Cover("http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg",
  "Sunsets and Sorrows", "sunsets", "sorrows")
];
var currentCover;

window.addEventListener("load", displayNewCover);
randomButton.addEventListener("click", displayNewCover);
makeNewButton.addEventListener('click', toggleMakeOwn);
homeButton.addEventListener('click', toggleHomeButton);
savedCoversButton.addEventListener('click', clickViewSave);
saveCover.addEventListener('click', saveCurrentCover);

makeNewBookButton.addEventListener('click', function(){
  event.preventDefault()
  makeNewBook()
});

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
};

function displayNewCover(newCover) {
  bookCover.src = newCover.cover || covers[getRandomIndex(covers)];
  bookTitle.innerText = newCover.title || titles[getRandomIndex(titles)];
  firstDescriptor.innerText = newCover.tagline1 || descriptors[getRandomIndex(descriptors)];
  secondDescriptor.innerText = newCover.tagline2 || descriptors[getRandomIndex(descriptors)];
  currentCover = new Cover(bookCover.src, bookTitle.innerText, firstDescriptor.innerText, secondDescriptor.innerText);
  };

  function removeHomeView() {
    document.querySelector('.home-view').classList.add('hidden');
  };

  function addHomeView() {
    document.querySelector('.home-view').classList.remove('hidden');
  };

  function removeHomeButton() {
    document.querySelector('.home-button').classList.add('hidden');
  };

  function addHomeButton() {
    document.querySelector('.home-button').classList.remove('hidden');
  };

  function removeRandomCover() {
    document.querySelector('.random-cover-button').classList.add('hidden');
  };

  function addRandomCover() {
    document.querySelector('.random-cover-button').classList.remove('hidden');
  };

  function removeSaveCover() {
    document.querySelector('.save-cover-button').classList.add('hidden');
  };

  function addSaveCover() {
    document.querySelector('.save-cover-button').classList.remove('hidden');
  };

  function removeFormView() {
    document.querySelector('.form-view').classList.add('hidden');
  };

  function addFormView() {
    document.querySelector('.form-view').classList.remove('hidden');
  };

  function removeSavedView() {
    document.querySelector('.saved-view').classList.add('hidden');
  };

  function addSavedView() {
    document.querySelector('.saved-view').classList.remove('hidden');
  };

  function toggleMakeOwn() {
    removeHomeView();
    removeRandomCover();
    removeSaveCover();
    addFormView();
    addHomeButton();
    removeSavedView();
  };

  function toggleSavedCovers() {
    removeHomeView();
    removeRandomCover();
    removeSaveCover();
    addHomeButton();
    removeFormView();
    addSavedView();
  };
  
  function toggleHomeButton() {    
      removeSavedView();
      removeFormView();
      addRandomCover();
      addHomeView();
      removeHomeButton();
      addSaveCover();
  };
  
  function clickViewSave() {
    toggleSavedCovers();
    displaySavedCovers();
  };
  
  function makeNewBook() {
    var coverInput = coverGlobal.value;
    var titleInput = titleGlobal.value;
    var userDescriptor1 = descriptor1Global.value;
    var userDescriptor2 = descriptor2Global.value;
    checkInput(coverInput, titleInput, userDescriptor1, userDescriptor2);
  };
  
  function addToArrays(coverInput, titleInput, userDescriptor1, userDescriptor2) {
    covers.unshift(coverInput);
    titles.unshift(titleInput);
    descriptors.unshift(userDescriptor1);
    descriptors.unshift(userDescriptor2);
    currentCover = new Cover(covers[0], titles[0], descriptors[1], descriptors[0]);
  };
  
  function saveCurrentCover() {
    if(!savedCovers.includes(currentCover)) {
      savedCovers.push(currentCover);
    };
  };
  
  function displaySavedCovers() {
    var display = [];
    savedCoversSection.innerHTML = display;
    for(var i = 0; i < savedCovers.length; i++) {
      savedCoversSection.innerHTML +=
      `<section id='${savedCovers[i].id}' class='mini-cover' ondblclick='deleteCover(this.id)'> <img class='cover-image' src=${savedCovers[i].cover}>
      <h2 class='cover-title'>${savedCovers[i].title}</h2>
      <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
      <img class="price-tag" src="./assets/price.png"> <img class="overlay" src="./assets/overlay.png"></section>`;
    }; 
  };
  
  function deleteCover(id) {
    for(var i = 0; i <= savedCovers.length; i++) {
      if (`${savedCovers[i].id}` === id) {
        savedCovers.splice(i, 1);
        displaySavedCovers();
      };
    };
  };

function checkInput(cover, title, descriptor1, descriptor2) {
  if(cover && title && descriptor1 && descriptor2) {
    addToArrays(cover, title, descriptor1, descriptor2);
    toggleHomeButton();
    displayNewCover(currentCover);
  } else {
    lackOfInputAlert(cover, title, descriptor1, descriptor2)
  };
};

function lackOfInputAlert(cover, title, descriptor1, descriptor2) {
  coverAlert(cover);
  titleAlert(title);
  descriptor1Alert(descriptor1);
  descriptor2Alert(descriptor2);
};

function coverAlert(cover) {
  if(!cover){
    coverGlobal.style.borderColor = 'red' 
    coverGlobal.placeholder = 'Please upload a scandalous cover image!'
  };  
};

function titleAlert(title) {
  if(!title){
    titleGlobal.style.borderColor = 'red' 
    titleGlobal.placeholder = 'Please provide an alluring title!'
  };
};

function descriptor1Alert(descriptor1) {
  if(!descriptor1){
    descriptor1Global.style.borderColor = 'red' 
    descriptor1Global.placeholder = 'Please provide a romantic descriptor!'
  };
};

function descriptor2Alert(descriptor2) {
  if(!descriptor2){
    descriptor2Global.style.borderColor = 'red' 
    descriptor2Global.placeholder = 'Please provide another spicy descriptor!'
  };
};
