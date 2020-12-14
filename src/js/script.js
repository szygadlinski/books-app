{

  'use strict';

  class BooksList {

    constructor(){
      const thisBooksList = this;

      thisBooksList.template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
      thisBooksList.filters = [];

      thisBooksList.generateElements();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.form = document.querySelector('.filters form');
    }

    generateElements(){
      const thisBooksList = this;

      for (const book of dataSource.books){
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generatedHTML = thisBooksList.template(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        document.querySelector('.books-list').appendChild(generatedDOM);
      }
    }

    initActions(){
      const thisBooksList = this;

      const favoriteBooks = [];
      document.querySelector('.books-list').addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookElement = event.target.closest('.book__image');
        if (bookElement) {
          if (favoriteBooks.indexOf(bookElement.getAttribute('data-id')) == -1) {
            favoriteBooks.push(bookElement.getAttribute('data-id'));
            bookElement.classList.add('favorite');
          } else {
            favoriteBooks.splice(favoriteBooks.indexOf(bookElement.getAttribute('data-id')), 1);
            bookElement.classList.remove('favorite');
          }
          console.log('favoriteBooks', favoriteBooks);
        }
      });

      document.querySelector('.filters form').addEventListener('click', function(event){
        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
          if (event.target.checked) {
            thisBooksList.filters.push(event.target.value);
          } else {
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(event.target.value), 1);
          }
          console.log('filters',thisBooksList.filters);
        }
        thisBooksList.filterBooks();
      });
    }

    filterBooks(){
      const thisBooksList = this;

      for (const book of dataSource.books) {
        let shouldBeHidden = false;
        for (const filter of thisBooksList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        console.log(shouldBeHidden);
        if (shouldBeHidden) {
          document.querySelector('.book__image[data-id="' + book.id + '"]').classList.add('hidden');
        } else {
          document.querySelector('.book__image[data-id="' + book.id + '"]').classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
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
  }

  new BooksList();
}
