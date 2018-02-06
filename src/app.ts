import { Category } from './enums';
import { Book, Logger, Author, Librarian, Magazine } from './interfaces';
import { UniversityLibrarian, ReferenceItem } from './classes';
import { CalculateLateFee as CalcFee, MaxBooksAllowed, Purge } from './lib/utilityFunctions';
import Encyclopedia from './Encyclopedia';
import Shelf from './shelf';

import * as _ from "lodash";

let snakeCaseTitle = _.snakeCase('For Whome the Bel Tolsl');
console.log(snakeCaseTitle);

let fee = CalcFee(3);
let max = MaxBooksAllowed(12);

function GetAllBooks() : Book[] {
    let books = [
        {
            id: 1,
            title: 'Ulysses', 
            author: 'James Joyce', 
            available: true,
            category: Category.Biography
        },
        {
            id: 2,
            title: 'A Farewell to Arms', 
            author: 'Ernest Hemingway',
            available: false,
            category: Category.Fiction
        },
        {
            id: 3,
            title: 'I know Why the Caged Bird Sings',
            author: 'Maya Angelou', 
            available: true,
            category: Category.Fiction
        },
        {
            id: 4,
            title: 'Moby Dick',
            author: 'Herman Melville', 
            available: true,
            category: Category.Fiction
        }
    ]
    return books;
}

function LogFirstAvailable(books: Book[]): void {
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
        if(currentBook.category === catergoryFilter){
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

function GetBookByID(id: number) : Book {
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
/*
console.log('unavailable titles: ');
GetTitles(false).forEach(x=> console.log(x));
console.log('titles by Ernest Hemingway:');
GetTitles('Ernest Hemingway').forEach(x=> console.log(x));
*/
function PrintBook(book: Book): void {
    console.log(book.title + ' by ' + book.author);
}

let myBook: Book = {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austin',
    available: true,
    category: Category.Fiction,
    pages: 250,
    markDamaged: (reason: string) => console.log('Damaged:' + reason)
}

PrintBook(myBook);
myBook.markDamaged('torn pages.');

let logDamage: Logger;

logDamage = (damage: string) => console.log('damage reported ' + damage);

logDamage(' dave is damaged');

let favoriteLibrarian: Librarian = new UniversityLibrarian();

favoriteLibrarian.name = 'Sharon';

favoriteLibrarian.assistCustomer('Lynda');

//let ref :ReferenceItem = new ReferenceItem('facts and figures', 2016);
//ref.PrintItem();
//ref.publisher = "test";

let refBook : ReferenceItem = new Encyclopedia('book', 2919, 4);
refBook.printCitation();

let Newspaper = class extends ReferenceItem {
    printCitation() : void {
        console.log('newspaper');
    }
}

let mypaper = new Newspaper('the mirror', 2018);

mypaper.printItem();

let inventory = [
    {
        id: 1,
        title: 'Ulysses', 
        author: 'James Joyce', 
        available: true,
        category: Category.Biography
    },
    {
        id: 2,
        title: 'A Farewell to Arms', 
        author: 'Ernest Hemingway',
        available: false,
        category: Category.Fiction
    },
    {
        id: 3,
        title: 'I know Why the Caged Bird Sings',
        author: 'Maya Angelou', 
        available: true,
        category: Category.Fiction
    },
    {
        id: 4,
        title: 'Moby Dick',
        author: 'Herman Melville', 
        available: true,
        category: Category.Fiction
    }
]


console.log('books');
inventory.forEach(book => console.log(book.title));

let purgedBooks: Array<Book> = Purge<Book>(inventory);

console.log('Purged Books');
purgedBooks.forEach(book => console.log(book.title));


let bookShelf: Shelf<Book> = new Shelf<Book>();

inventory.forEach(book => bookShelf.add(book));

let firstBook: Book = bookShelf.getFirst();

let magazines: Array<Magazine> = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press'},
    { title: 'Five Points', publisher: 'GSU'}
];

let magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();

magazines.forEach(mag => magazineShelf.add(mag));


magazineShelf.printTitles();

let softwareBook = bookShelf.find('Code Complete');

let firstMagazine: Magazine = magazineShelf.getFirst();
