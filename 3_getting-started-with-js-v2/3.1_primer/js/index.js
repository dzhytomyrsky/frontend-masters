const EXCLUSION_STRING = 'great';

function addFavoriteBook (bookName) {
    if (!bookName.toLowerCase().includes(EXCLUSION_STRING)) {
        favoriteBooks.push(bookName);
    }
}

function printBooks (books) {
    for (let book of books) {
        console.log(book)
    }

    console.log(`You have ${favoriteBooks.length} books`);
}

const favoriteBooks = [];

addFavoriteBook("A Song of Ice and Fire");
addFavoriteBook("The Great Gatsby");
addFavoriteBook("Crime & Punishment");
addFavoriteBook("Great Expectations");
addFavoriteBook("You Don't Know JS");

printBooks(favoriteBooks);