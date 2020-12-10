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
    const images = document.querySelectorAll('.book__image');
    for (let image of images){
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        favoriteBooks.push(image.getAttribute('data-id'));
        image.classList.add('favorite');
      });
    }
  }

  generateElements();
  initActions();
}
