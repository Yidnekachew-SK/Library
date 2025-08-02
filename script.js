const myLibrary = [];
let container = document.querySelector(".book-container");

function Book(title, author, pages, status){
	if(!new.target){
		console.log("can not call the function without instance of the object")
	}
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.status = status;
}

Book.prototype.changeStatus = function(){
	if(this.status === "Read"){
		this.status = "Not read";
	}else{
		this.status = "Read";
	}
}

function addBookToLibrary(bookObjects){
	let id = crypto.randomUUID();
	bookObjects.Id = id;
	myLibrary.push(bookObjects);

	return myLibrary;
}

let bookNo = 0;
function displayBooks(books){
	
	let book = document.createElement("div");
	book.className = "book-card";
	book.setAttribute("id","book-" + myLibrary[bookNo].Id);
	container.prepend(book);

	let statusParagraph;
	for(let j = 0; j < 5; j++){
		let paragraph = document.createElement("p");
		book.prepend(paragraph);
		let para = document.querySelector("p");

		switch(j){
			case 0:
				para.textContent = "Status: " + myLibrary[bookNo].status;
				statusParagraph = para;
				break;
			case 1:
				para.textContent = "No of pages: " + myLibrary[bookNo].pages;
				break;
			case 2:
				para.textContent = "Author: " + myLibrary[bookNo].author;
				break;
			case 3:
				para.textContent = "ID: " + myLibrary[bookNo].Id;
				break;
			case 4:
				para.textContent = "Title: " + myLibrary[bookNo].title;
				break;
		}
	}
	let buttonContainer = document.createElement("div");
	buttonContainer.className = "button-container";
	book.append(buttonContainer);

	let button = document.createElement("button");
	button.textContent = "Remove";
	button.className = "remove-book";
	button.setAttribute("id", "book-" + myLibrary[bookNo].Id);
	buttonContainer.append(button);

	button.addEventListener("click", () => {
		let bookId = event.target.id;
		let bookToRemove = document.querySelector(`#${bookId}`);
		bookToRemove.parentElement.removeChild(bookToRemove);
	})

	let toggleButton = document.createElement("button");
	toggleButton.textContent = "Change status";
	toggleButton.className = "change-status"
	buttonContainer.append(toggleButton);

	toggleButton.addEventListener("click", () => {
		books.changeStatus();
		statusParagraph.textContent = "Status: " + books.status;
	})

	bookNo++;
}

const addButton = document.querySelector(".addBook");
addButton.addEventListener("click", () =>{
	let form = document.querySelector("form");
	form.style.display = "block";
})

const form = document.querySelector("#book-form");
form.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);

	let title = formData.get('Title');
	let author = formData.get('Author');
	let pages = formData.get('Pages');
	let read = formData.get('Status');

	let addedBook = new Book(title, author, pages, read);
	addBookToLibrary(addedBook);
	displayBooks(addedBook);

	let bookForm = document.querySelector("form");
	bookForm.style.display = "none";
	form.reset();
})

const book1 = new Book("Book1", "someone", 100, "Not read");

addBookToLibrary(book1);
displayBooks(book1);