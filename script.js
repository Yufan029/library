const popupDialog = document.querySelector('.popupDialog');
const newBookBtn = document.querySelector('.newBookBtn');
const submitBtn = document.querySelector('#submit');
const cancelBtn = popupDialog.querySelector('#cancel');

cancelBtn.addEventListener('click', () => {
    popupDialog.close();
});

newBookBtn.addEventListener('click', () => {
    popupDialog.showModal();
});

submitBtn.addEventListener('click', (event) => {
    const formTitle = document.querySelector('#title');
    const formAuthor = document.querySelector('#author');
    const formPages = document.querySelector('#numberOfPages');
    const formRead = document.querySelector('#alreadyRead');

    const book = new Book(formTitle.textContent, formAuthor.textContent, formPages.textContent, formRead);
    addBookToLibrary(book);
    showBook();

    event.preventDefault();
    popupDialog.close();
})

const myLibrary = [];

function Book(title, author, numberOfPages, alreadyRead) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.alreadyRead = alreadyRead;
}

Book.prototype.info = function() {
    const readStatus = this.alreadyRead ? 'already read' : 'not read yet';
    return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${readStatus}.`
}

const book1 = new Book("The Hobbit", "J.R.R. aaaaaaaaa", 295, false);
const book2 = new Book("The Hobbit", "J.R.R. bbbbbbbb", 295, false);
const book3 = new Book("The Hobbit", "J.R.R. cccccccc", 295, false);
const book4 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const book5 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);


function addBookToLibrary(book) {
    myLibrary.push(book);
}

function showBook() {
    const cards = document.querySelector('.cards');

    myLibrary.forEach(x => {
        let divElement = document.createElement('div');
        divElement.classList.add('card');
    
        let pElement = document.createElement('p');
        if (x.info().length > 140) {
            pElement.textContent = x.info().slice(0, 140) + '...';    
        } else {
            pElement.textContent = x.info();
        }

        divElement.appendChild(pElement);
        cards.appendChild(divElement);
    })
}