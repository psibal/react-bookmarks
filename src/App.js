import React from 'react';
import './App.css';

const data = [
  { id: 1, title: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/"},
  { id: 2, title: "Linux Academy", url: "https://www.linuxacademy.com/"},
  { id: 3, title: "LogicMojo", url: "https://www.logicmojo.com/"},
  { id: 4, title: "PacktPub", url: "https://packtpub.in"},
  { id: 5, title: "Scrimba", url: "https://scrimba.com"},
  { id: 6, title: "Skillshare", url: "https://skillshare.com"},
  { id: 7, title: "Educative", url: "https://educative.io"},
  { id: 8, title: "GreatCodeClub", url: "https://www.greatcodeclub.com"},
  { id: 9, title: "21-Draw", url: "https://tv.21-draw.com/catalog"},
  { id: 10, title: "The Great Courses", url: "https://www.thegreatcoursesplus.com/"},
]

function App() {
  const [state, setState] = React.useState(data);

  return (
    <div className="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary full-w">
         <div class="container-fluid">
            <a class="navbar-brand" href="#">Bookmarkr</a>
          </div>      
      </nav>
      <div>
      {
          state.map(data => {
            return (
              <div key={data.id}>
                <a href={data.url} target="_blank">  
                    {data.title}
                </a>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
