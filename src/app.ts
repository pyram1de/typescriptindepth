enum Category { Biography, Poetry, Fiction }

function GetAllBooks() {
    let books = [
        {
            title: 'Ulysses', 
            author: 'James Joyce', 
            available: true,
            catergory: Category.Biography
        },
        {
            title: 'A Farewell to Arms', 
            author: 'Ernest Hemingway',
            available: true,
            catergory: Category.Fiction
        },
        {
            title: 'I know Why the Caged Bird Sings',
            author: 'Maya Angelou', 
            available: true,
            catergory: Category.Fiction
        },
        {
            title: 'Moby Dick',
            author: 'Herman Melville', 
            available: true,
            catergory: Category.Fiction
        }
    ]

    return books;
}

function LogFirstAvailable(books): void {
    let numberOfBooks: number = books.length;
    let firstAvailable: string = '';
    for (let currentBook of books) {

        if (currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }
    console.log('total books: ' + numberOfBooks);
    console.log('first available: ' + firstAvailable);
}

function GetBookTitlesByCategory(catergoryFilter: Category): Array<string> {
    console.log('Getting books in category:' + Category[catergoryFilter]);

    const allBooks = GetAllBooks();
    const filteredTitles: string[] = [];
    for(let currentBook of allBooks){
        if(currentBook.catergory === catergoryFilter){
            filteredTitles.push(currentBook.title);
        }
    }
    return filteredTitles;
}

function LogBookTItles(titles: string[]): void {
    for(let title of titles){
        console.log(title);
    }
}

let fictionBooks = GetBookTitlesByCategory(Category.Fiction);
LogBookTItles(fictionBooks);

//const allBooks = GetAllBooks();

//LogFirstAvailable(allBooks);

