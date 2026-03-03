// Data Transfer Object

class IssuedBook {
    _id;
    name;
    author;
    genre;
    price;
    publicher;
    issuedBy;
    issuedDate;
    returnDate;

    constructor(user) {
        this._id = user.issuedBook._id;
        this.name = user.issuedBook.name;
        this.author = user.issuedBook.author;
        this.genre = user.issuedBook.genre;
        this.price = user.issuedBook.price;
        this.publicher = user.issuedBook.publicher;
        this.issuedBy = user.issuedBy;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    }
}