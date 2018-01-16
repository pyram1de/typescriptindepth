function GetAllBooks() {
    let books = [
        {title: 'test1', author: 'test1', available: true},
        {title: 'test2', author: 'test2', available: true},
        {title: 'test3', author: 'test3', available: true},
    ]

    return books;
}

function LogFirstAvailable(books){
    let numberOfBooks = books.length;
    let firstAvailable = '';
    for (let currentBook of books) {
        
        if(currentBook.available){
            firstAvailable = currentBook.title;
            break;
        }
    }
    console.log('total books: ' + numberOfBooks);
    console.log('first available: ' + firstAvailable);
}

const allBooks = GetAllBooks();
LogFirstAvailable(allBooks);

