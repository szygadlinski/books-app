{

  'use strict';

  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

  function generateElements(){
    for (const book of dataSource.books){
      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
      const generatedHTML = template(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      document.querySelector('.books-list').appendChild(generatedDOM);
    }
  }

  const favoriteBooks = [];

  function initActions(){

    document.querySelector('.books-list').addEventListener('dblclick', function(event){
      event.preventDefault();
      if (event.target.classList.contains('.book__image')) {
        if (favoriteBooks.indexOf(event.target.getAttribute('data-id')) == -1) {
          favoriteBooks.push(event.target.getAttribute('data-id'));
          event.target.classList.add('favorite');
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(event.target.getAttribute('data-id')), 1);
          event.target.classList.remove('favorite');
        }
      }
    });

    form.addEventListener('click', function(event){
      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
        if (event.target.checked) {
          filters.push(event.target.value);
        } else {
          filters.splice(filters.indexOf(event.target.value), 1);
        }
      }
      filterBooks();
    });
  }

  const filters = [];
  const form = document.querySelector('.filters form');

  function filterBooks(){
    for (const book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      console.log(shouldBeHidden);
      if (shouldBeHidden) {
        document.querySelector('.book__image[data-id="book.id"]').classList.add('hidden');
      } else {
        document.querySelector('.book__image[data-id="book.id"]').classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){
    let background;
    if (rating < 7) {
      background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating > 7 && rating <= 8) {
      background = 'linear-gradient(to bottom, #fefcea 0%, #b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #fefcea 0%, #299a0b 100%)';
    } else {
      background = 'linear-gradient(to bottom, #fefcea 0%, #ff0084 100%)';
    }
    return background;
  }

  generateElements();
  initActions();
}
