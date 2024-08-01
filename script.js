class Library {
    books = [];

    addBook(book) {
        this.books.push(book);
    }

    deleteBook(index) {
        this.books.splice(index, 1);
    }
}

class Book {
    constructor(title, author, numberOfPages, alreadyRead) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.alreadyRead = alreadyRead;
    }

    info() {
        const readStatus = this.alreadyRead ? 'already read' : 'not read yet';
        return `${this.title} by ${this.author}, ${this.numberOfPages} pages, ${readStatus}.`
    }
}

function renderScreen(myLibrary) {
    const popupDialog = document.querySelector('.popupDialog');
    const newBookBtn = document.querySelector('.newBookBtn');
    const submitBtn = document.querySelector('#submit');
    const cancelBtn = popupDialog.querySelector('#cancel');
    const formTitle = popupDialog.querySelector('#title');
    const formAuthor = popupDialog.querySelector('#author');
    const formPages = popupDialog.querySelector('#numberOfPages');
    const formRead = popupDialog.querySelector('#alreadyRead');
    
    newBookBtn.addEventListener('click', () => {
        popupDialog.showModal();
        formTitle.value = "";
        formAuthor.value = "";
        formPages.value = "";
        formRead.checked = false;
    });

    submitBtn.addEventListener('click', (event) => {
        const book = new Book(formTitle.value, formAuthor.value, formPages.value, formRead.checked);
        myLibrary.addBook(book);
        renderLibrary();
    
        event.preventDefault();
        popupDialog.close();
    });

    cancelBtn.addEventListener('click', () => {
        popupDialog.close();
    });

    const renderLibrary = () => {
        document.querySelector('.cards').textContent = '';
        for (let i = 0; i < myLibrary.books.length; i++) {
            renderBook(myLibrary.books[i], i);
        }
    };

    const renderBook = (book, index) => {
        const cards = document.querySelector('.cards');
    
        let divElement = document.createElement('div');
        divElement.classList.add('card');

        let pElement = document.createElement('p');
        if (book.info().length > 80) {
            pElement.textContent = book.info().slice(0, 80) + '...';
        } else {
            pElement.textContent = book.info();
        }
    
        divElement.appendChild(pElement);
    
        appendOperationIcons(divElement, book.alreadyRead, index);
        cards.appendChild(divElement);
    };
    
    const appendOperationIcons = (divElement, alreadyRead, index) => {
        const operations = document.createElement('div');
        operations.classList.add('operations');
    
        const readSvg = readIcon();
        const unreadIconSvg = unreadIcon();
        const deleteSvg = deleteIcon();

        // add index for deletion in future.
        readSvg.dataset.index = index;
        unreadIconSvg.dataset.index = index;
        deleteSvg.dataset.index = index;
    
        if (alreadyRead) {
            readSvg.style.display = 'block';
            unreadIconSvg.style.display = 'none';
            divElement.classList.add('read-background');
        } else {
            readSvg.style.display = 'none';
            unreadIconSvg.style.display = 'block';
        }
    
        operations.appendChild(readSvg);
        operations.appendChild(unreadIconSvg);
        operations.appendChild(deleteSvg);
    
        divElement.appendChild(operations);
    
        readSvg.addEventListener('click', (e) => {
            const index = e.currentTarget.dataset.index;
            myLibrary.books[index].alreadyRead = false;
            toggleBookReadStatus(readSvg, '.book-unread');
            toggleBookInfo('already read', 'not read yet');
            divElement.classList.remove('read-background');
        });
    
        unreadIconSvg.addEventListener('click', (e) => {
            const index = e.currentTarget.dataset.index;
            myLibrary.books[index].alreadyRead = true;
            toggleBookReadStatus(unreadIconSvg, '.book-read');
            toggleBookInfo('not read yet', 'already read');
            divElement.classList.add('read-background');
        });
    
        // have some issue, after delete the index changed, 
        // but the associated data-attribute is not change, will fix later.
        deleteSvg.addEventListener('click', (e) => {
            const index = e.currentTarget.dataset.index;
            myLibrary.books.splice(index, 1);
            renderLibrary();
        });
    
        function toggleBookReadStatus(icon, className) {
            icon.style.display = 'none';
            icon.parentNode.querySelector(className).style.display = 'block';
        }

        function toggleBookInfo(originalText, newText) {
            let pNode = readSvg.parentNode.parentNode.querySelector('p');
            let bookInfo = pNode.textContent;
            pNode.remove();
    
            let newInfo = bookInfo.replace(originalText, newText);
            let newPnode = document.createElement('p');
            newPnode.appendChild(document.createTextNode(newInfo));
    
            readSvg.parentNode.parentNode.insertBefore(newPnode, readSvg.parentNode);
        }
    };
    
    readIcon = () => {
        return createIcon('book-read', 'book-check-outline', "M16.75 22.16L14 19.16L15.16 18L16.75 19.59L20.34 16L21.5 17.41L16.75 22.16M18 2C19.1 2 20 2.9 20 4V13.34C19.37 13.12 18.7 13 18 13V4H13V12L10.5 9.75L8 12V4H6V20H12.08C12.2 20.72 12.45 21.39 12.8 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H18Z");
    };
    
    unreadIcon = () => {
        return createIcon('book-unread', 'book-remove-outline', "M13.09 20C13.21 20.72 13.46 21.39 13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H18C19.11 2 20 2.9 20 4V13.09C19.67 13.04 19.34 13 19 13C18.66 13 18.33 13.04 18 13.09V4H13V12L10.5 9.75L8 12V4H6V20H13.09M22.54 16.88L21.12 15.47L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88Z");
    };
    
    deleteIcon = () => {
        return createIcon('book-delete', 'trash-can-outline', "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z");
    };
    
    createIcon = (newClassName, titleContent, pathContent) => {
        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
        iconSvg.classList.add(newClassName);
        iconSvg.setAttribute('viewBox', "0 0 24 24");
    
        const title = document.createElement('title');
        title.appendChild(document.createTextNode(titleContent));
    
        iconPath.setAttribute('d', pathContent);
    
        iconSvg.appendChild(title);
        iconSvg.appendChild(iconPath);
    
        return iconSvg;
    };
}

const myLibrary = new Library();
renderScreen(myLibrary);