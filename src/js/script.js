{

  'use strict';

  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  function generateElements(){
    for (const book of dataSource.books){
      const generatedHTML = template(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      document.querySelector('.books-list').appendChild(generatedDOM);
    }
  }

  const favoriteBooks = [];
  function initActions(){
    document.querySelector('.books-list').addEventListener('dblclick', function(event){
      event.preventDefault();
      if (event.target && event.target.classList.contains('.book__image')) {
        if (favoriteBooks.indexOf(event.target.getAttribute('data-id')) == -1) {
          favoriteBooks.push(event.target.getAttribute('data-id'));
          event.target.classList.add('favorite');
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(event.target.getAttribute('data-id')), 1);
          event.target.classList.remove('favorite');
        }
      }
    });
  }

  generateElements();
  initActions();
}
