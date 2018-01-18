function GetAllBooks() {
    let books = [
        {title: 'Ulysses', author: 'James Joyce', available: true},
        {title: 'A Farewell to Arms', author: 'Ernest Hemingway', available: true},
        {title: 'I know Why the Caged Bird Sings', author: 'Maya Angelou', available: true},
        {title: 'Moby Dick', author: 'Herman Melville', available: true}
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

