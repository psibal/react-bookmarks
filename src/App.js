import React from 'react';
import './App.css';

// const data = [
//   { id: 1, title: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/"},
//   { id: 2, title: "Linux Academy", url: "https://www.linuxacademy.com/"},
//   { id: 3, title: "LogicMojo", url: "https://www.logicmojo.com/"},
//   { id: 4, title: "PacktPub", url: "https://packtpub.in"},
//   { id: 5, title: "Scrimba", url: "https://scrimba.com"},
//   { id: 6, title: "Skillshare", url: "https://skillshare.com"},
//   { id: 7, title: "Educative", url: "https://educative.io"},
//   { id: 8, title: "GreatCodeClub", url: "https://www.greatcodeclub.com"},
//   { id: 9, title: "21-Draw", url: "https://tv.21-draw.com/catalog"},
//   { id: 10, title: "The Great Courses", url: "https://www.thegreatcoursesplus.com/"},
// ]

const books = {
    1:{ id: 1, title: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/", 
    chapters:{
      1:{
        id: 1, book_id: 1, title: "Chapter 1", summary: "Summary of chapter 1",
        body: "The chapter 1 goes here."
      },
      2:{
        id: 2, book_id: 1, title: "Chapter 2", summary: "Summary of chapter 2",
        body: "The chapter 2  goes here."
      }
    }
  },
  2:{ id: 2, title: "Linux Academy", url: "https://www.linuxacademy.com/", chapters:[]},
  3:{ id: 3, title: "LogicMojo", url: "https://www.logicmojo.com/", chapters:[]},
  4:{ id: 4, title: "PacktPub", url: "https://packtpub.in", chapters:[]},
  5:{ id: 5, title: "Scrimba", url: "https://scrimba.com", chapters:[]},
  6:{ id: 6, title: "Skillshare", url: "https://skillshare.com", chapters:[]},
  7:{ id: 7, title: "Educative", url: "https://educative.io", chapters:[]},
  8:{ id: 8, title: "GreatCodeClub", url: "https://www.greatcodeclub.com", chapters:[]},
  9:{ id: 9, title: "21-Draw", url: "https://tv.21-draw.com/catalog", chapters:[]},
  8:{ id: 10, title: "The Great Courses", url: "https://www.thegreatcoursesplus.com/", chapters:[]},
}


function App() {
  const [state, setState] = React.useState(books);
  const [bookMenu, setBookMenu] = React.useState({});
  const [currentChapter, setCurrentChapter] = React.useState({});

  const toggleBook = (e, book_id) => {
    e.stopPropagation();
    if (!book_id) return;
    const copy = {...bookMenu};
    const book = copy[book_id];
    if (!book) {
      copy[book_id] = true;
    } else {
      copy[book_id] = false;
    }
    setBookMenu(copy);
  }

  const showChapter = (e, book_id, chapter_id) => {
    e.stopPropagation();
    setCurrentChapter({
      book_id,
      chapter_id
    })
  }

  return (
    <div className="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary full-w">
         <div class="container-fluid">
            <a class="navbar-brand" href="#">Bookmarkr</a>
          </div>      
      </nav>
      <div className="book d-flex">
        <ul className="chapter-names">
        {
            Object.keys(state).map(key => {
              let book = state[key];
              return (
                <li key={book.id} data-book="book" onClick={(e)=>toggleBook(e,book.id)}>
                  <span>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                    {book.title}
                  </span>
                  {
                    bookMenu[book.id] && <ul>{
                      Object.keys(book.chapters).map(ckey => {
                        let chapter = book.chapters[ckey];
                        return (
                          <li onClick={((e) => showChapter(e, book.id, chapter.id ))}>
                            {chapter.title}
                          </li>
                        )
                      })
                    }
                    </ul>
                  }
                </li>
              )
            })
          }
        </ul>
        <div className="chapter">
            {currentChapter && <div>
              {currentChapter.chapter_id}
            </div>  
            }
        </div>
      </div>
    </div>
  );
}

export default App;
