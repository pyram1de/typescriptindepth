enum Category { Biography, Poetry, Fiction }

function GetAllBooks() {
    let books = [
        {
            id: 1,
            title: 'Ulysses', 
            author: 'James Joyce', 
            available: true,
            catergory: Category.Biography
        },
        {
            id: 2,
            title: 'A Farewell to Arms', 
            author: 'Ernest Hemingway',
            available: false,
            catergory: Category.Fiction
        },
        {
            id: 3,
            title: 'I know Why the Caged Bird Sings',
            author: 'Maya Angelou', 
            available: true,
            catergory: Category.Fiction
        },
        {
            id: 4,
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
    //console.log('total books: ' + numberOfBooks);
    console.log('first available: ' + firstAvailable);
}

function GetBookTitlesByCategory(catergoryFilter: Category = Category.Biography): Array<string> {
    console.log('Getting books in category: ' + Category[catergoryFilter]);

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

function GetBookByID(id: number){
    const allBooks = GetAllBooks();
    return allBooks.filter(book => book.id ===id)[0];
}

function CreateCustomerId(name: string, id: number) : string {
    return name + id;
}

function CreateCustomer(name: string, age?: number, city?: string): void {
    console.log('Creating customer: ' + name);
    if(age){
        console.log('Age: '  + age)
    }
    if(city){
        console.log('City: ' + city);
    }
}

function CheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log('Checking out books for ' + customer);

    let booksCheckedOut: string[] = [];
    for(let id of bookIDs){
        let book = GetBookByID(id);
        if(book && book.available){
            booksCheckedOut.push(book.title);
            book.available = false;
        }
    }
    return booksCheckedOut;
}

LogFirstAvailable(GetAllBooks());
let booksCheckedOut = CheckoutBooks('Dave', 1, 3, 4,5);

console.log('Dave checked out :' + booksCheckedOut.join(','));
LogFirstAvailable(GetAllBooks());

// define signature for overloads.

function GetTitles(author: string): string[];
function GetTitles(available: boolean): string[];

function GetTitles(bookProperty: any): string[] {
    const allBooks = GetAllBooks();
    const foundTitles: string[] = [];
    if(typeof bookProperty == 'string'){
        for(let book of allBooks){
            if(book.author === bookProperty){
                foundTitles.push(book.title);
            }
        }
    }
    else if(typeof bookProperty == 'boolean'){
        for(let book of allBooks){
            if(book.available === bookProperty){
                foundTitles.push(book.title);
            }
        }
    }
    return foundTitles;
}

console.log('unavailable titles: ');
GetTitles(false).forEach(x=> console.log(x));
console.log('titles by Ernest Hemingway:');
GetTitles('Ernest Hemingway').forEach(x=> console.log(x));

/*
let fictionBooks = GetBookTitlesByCategory(Category.Fiction);
fictionBooks.forEach((val, idx, arr)=> console.log(++idx + ' - ' + val));


let x: number;
let IdGenerator: (chars: string, nums: number) => string;

IdGenerator =  (x,y) =>  'hello' ;
  
let myID : string = CreateCustomerId('daniel', 10);
console.log(myID);

*/

//const allBooks = GetAllBooks();

//LogFirstAvailable(allBooks);

