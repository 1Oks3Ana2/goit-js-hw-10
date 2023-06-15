import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const breedsSelectorRef = document.querySelector('.breed-select');
const catInfoRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

selectBreeds();
hideElement(errorRef);
loaderRef.innerHTML = '';

breedsSelectorRef.addEventListener('change', () => {
  const selectedCatIndex = breedsSelectorRef.selectedIndex;
  const selectedCatValue = breedsSelectorRef.options[selectedCatIndex].value;

  catInfoRef.innerHTML = '';
  showElement(loaderRef);

  fetchCatByBreed(selectedCatValue)
    .then(cat => {
      onCatSelectMarkup(cat);
      hideElement(loaderRef);
    })
    .catch(error => {
      hideElement(loaderRef);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});

function selectBreeds() {
  hideElement(breedsSelectorRef);

  fetchBreeds()
    .then(breeds => {
      onFetchBreedsMarkup(breeds);
      showElement(breedsSelectorRef);
      hideElement(loaderRef);
    })
    .catch(error => {
      hideElement(loaderRef);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function hideElement(element) {
  element.classList.add('visually-hidden');
}

function showElement(element) {
  element.classList.remove('visually-hidden');
}

function onFetchBreedsMarkup(breeds) {
  const addBreedValue = breeds
    .map(({ id, name }) => {
      return `<option class='breed' value=${id}>${name}</option>`;
    })
    .join('');

  breedsSelectorRef.insertAdjacentHTML('beforeend', addBreedValue);
}

function onCatSelectMarkup(cat) {
  if (cat.length === 0) {
    return Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  }
  const markup = cat
    .map(({ url, breeds }) => {
      return `<img src='${url}' alt='${breeds[0].name}' class="cat-image" />
              <div class="cat-placeholder"><h1 class="cat-name">${breeds[0].name}</h1><p class="cat-description">${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
    })
    .join('');

  catInfoRef.innerHTML = markup;
}
