class Bookshelf {
	constructor() {
		this.favoriteBooks = [];
	}

    addFavoriteBook(bookName) {
        if (!bookName.includes('Great')) {
            this.favoriteBooks.push(bookName);
        }
    }

    printFavoriteBooks() {
        console.log(`Favorite Books: ${this.favoriteBooks.length}`);

        for (let bookName of this.favoriteBooks) {
            console.log(String(bookName));
        }
    }
}



function loadBooks(bookShelf) {
	fakeAjax(BOOK_API, function (books) {
        for (let book of books) {
            bookShelf.addFavoriteBook(book);
        }
    });

    bookShelf.printFavoriteBooks();
}

var BOOK_API = "https://some.url/api";

const newShelf = new Bookshelf();
loadBooks(newShelf)

// ***********************

// NOTE: don't modify this function at all
function fakeAjax(url,cb) {
	setTimeout(function fakeLoadingDelay(){
		cb([
			"A Song of Ice and Fire",
			"The Great Gatsby",
			"Crime & Punishment",
			"Great Expectations",
			"You Don't Know JS"
		]);
	},500);
}