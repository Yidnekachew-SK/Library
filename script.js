class Library {
	Library = [];

	get Library(){
		return this.Library;
	}

	addBookToLibrary(bookObjects){
		let id = crypto.randomUUID();
		bookObjects.Id = id;
		this.Library.push(bookObjects);

		return this.Library;
	}
}


class Book extends Library{
	bookNo = 0;
	container = document.querySelector(".book-container");
	isValid = true;

	constructor(title, author, pages, status){
		super()
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.status = status;
	}

	changeBookStatus(){
		if(this.status === "Read"){
			this.status = "Not read";
		}else{
			this.status = "Read";
		}
		return this.status;
	}

	displayBooks(books){
		let book = document.createElement("div");
		book.className = "book-card";
		book.setAttribute("id","book-" + this.Library[this.bookNo].Id);
		this.container.prepend(book);

		let statusParagraph;
		for(let j = 0; j < 5; j++){
			let paragraph = document.createElement("p");
			book.prepend(paragraph);
			let para = document.querySelector("p");

			switch(j){
				case 0:
					para.textContent = "Status: " + this.Library[this.bookNo].status;
					statusParagraph = para;
					break;
				case 1:
					para.textContent = "No of pages: " + this.Library[this.bookNo].pages;
					break;
				case 2:
					para.textContent = "Author: " + this.Library[this.bookNo].author;
					break;
				case 3:
					para.textContent = "Title: " + this.Library[this.bookNo].title;
					break;
			}
		}


		let buttonContainer = document.createElement("div");
		buttonContainer.className = "button-container";
		book.append(buttonContainer);

		let button = document.createElement("button");
		button.textContent = "Remove";
		button.className = "remove-book";
		button.setAttribute("id", "book-" + this.Library[this.bookNo].Id);
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
			books.changeBookStatus();
			statusParagraph.textContent = "Status: " + books.status;
		})

		this.bookNo++;
		this.addBookButton();
		this.getFormData();
	}

	addBookButton(){
		const addButton = document.querySelector(".addBook");
		addButton.addEventListener("click", () =>{
			let form = document.querySelector("form");
			form.style.display = "block";
		})
	}

	validateFormInputs() {
		const form = document.querySelector("#book-form");
  		const inputs = document.querySelectorAll("input");
  		inputs.forEach(input => input.addEventListener("input", (event) => {
  			const errorDisplayer = document.querySelector(`.${event.target.id}-error-message`);
  			if (input.checkValidity()) {
  				errorDisplayer.textContent = "";
  				return;
  			}
  			if (event.target.checkValidity() === false) {
  				if(event.target.validity.valueMissing === true){
  					errorDisplayer.textContent = event.target.name + " is required!";
  					this.isValid = false;
  				} else if (event.target.validity.rangeUnderflow === true) {
  					errorDisplayer.textContent = event.target.name + 
  														" number can not be negative";
  					this.isValid = false;
  				} else if (event.target.validity.typeMismatch) {
  					errorDisplayer.textContent = "the input type is not allowed";
  					this.isValid = false;
  				}
  			}
  		}))
  		return this.isValid;
	}

	getFormData(){
		this.validateFormInputs();
		const form = document.querySelector("#book-form");
		form.addEventListener("submit", (event) => {
			if(!this.isValid) {
				event.preventDefault();
			}

			if (form.checkValidity()) {
				const formData = new FormData(event.target);

				let title = formData.get('Title');
				let author = formData.get('Author');
				let pages = formData.get('Pages');
				let read = formData.get('Status');

				let addedBook = new Book(title, author, pages, read);
				this.addBookToLibrary(addedBook);
				this.displayBooks(addedBook);

				let bookForm = document.querySelector("form");
				bookForm.style.display = "none";
				form.reset();
			}
		})
	}
}

const book1 = new Book("Book1", "someone", 100, "Not read");

book1.addBookToLibrary(book1);
book1.displayBooks(book1);