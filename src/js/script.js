'use strict';

{

  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);

  function generateElements(){
    for (const book of dataSource.books){
      const generatedHTML = template(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      document.querySelector('.books-list').appendChild(generatedDOM);
    }
  }

  generateElements();

}
