let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    const book1 = new Book("Robinson Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );

    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const isReadInput = document.getElementById("isRead");
const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addBook();
});

function addBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = Number.parseInt(pagesInput.value, 10);

  if (!title || !author || !Number.isInteger(pages) || pages < 1) {
    alert("Please enter valid book details.");
    return;
  }

  const book = new Book(title, author, pages, isReadInput.checked);

  myLibrary.push(book);

  clearForm();
  render();
}

function clearForm() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  isReadInput.checked = false;
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function render() {
  const tableBody = document.getElementById("book-list");

  tableBody.replaceChildren();

  for (let i = 0; i < myLibrary.length; i++) {
    const row = tableBody.insertRow();
    const titleCell = row.insertCell();
    const authorCell = row.insertCell();
    const pagesCell = row.insertCell();
    const wasReadCell = row.insertCell();
    const deleteCell = row.insertCell();

    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    const changeButton = document.createElement("button");
    changeButton.className = "btn btn-success";
    changeButton.textContent = myLibrary[i].isRead ? "No" : "Yes";

    wasReadCell.appendChild(changeButton);

    changeButton.addEventListener("click", function () {
      myLibrary[i].isRead = !myLibrary[i].isRead;
      render();
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-warning";
    deleteButton.textContent = "Delete";

    deleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;

      myLibrary.splice(i, 1);
      render();

      alert(`You've deleted title: ${deletedTitle}`);
    });
  }
}
