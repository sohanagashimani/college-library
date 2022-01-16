function showtable() {
    let library = localStorage.getItem("library");
    if (library == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(library);
    }
    // console.log("adding to ui");
    let uiString = "";
    tableBody = document.getElementById('tableBody');
    notesObj.forEach(function (element) {
        uiString += `<tr>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        </tr>`;
    });
    tableBody.innerHTML = uiString;

}
showtable();
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;

    }
}
class Display {
    add() {
        let library = localStorage.getItem("library");
        if (library == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(library);
        }
        // console.log("adding to ui");
        let uiString = "";
        let tableBody = document.getElementById('tableBody');
        notesObj.forEach(function (element) {
            uiString += `<tr>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.type}</td>
            </tr>`;
        });
        tableBody.innerHTML = uiString;

    }
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    show (type, displayMessage) {
        let message = document.getElementById('message');
        let boldtext;
        if(type ==="success"){
            boldtext = "Success";
        }else{
            boldtext = "Error";
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${boldtext}:</strong> ${displayMessage}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
    </div>`;
        setTimeout(() => {
            message.innerHTML = ''
        }, 4000);
    }
}
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormsSubmit);

function libraryFormsSubmit(e) {
    e.preventDefault();

    // console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;
    if (fiction.checked) {
        type = fiction.value;

    } else if (programming.checked) {
        type = programming.value;

    } else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    // let bookarray = [];
    // bookarray.push(book);
    // console.log(bookarray);
    // console.log(book);
    let library = localStorage.getItem("library");
    if (library == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(library);
    }

    let display = new Display();
    if (display.validate(book)) {
        notesObj.push(book);
        localStorage.setItem("library", JSON.stringify(notesObj));
        display.show('success', ' Your book has been successfully added');

        display.add();
        display.clear();
    } else {
        // show the error to the user
        display.show('error', ' Sorry you cannot add this book');
    }

}