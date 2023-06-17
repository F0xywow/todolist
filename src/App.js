import React, { useState } from 'react';
import './App.css';



const Note = () => {
  const [text, setText] = useState('');
  const [divs, setDivs] = useState([]);
  let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  function handleDeleteDiv(event) {
    event.stopPropagation();
    if (!event.target.matches('button')) {
      const div = event.target.closest('div');
      div.remove();
    }
  }

  function handleAddDiv() {
    const input = document.querySelector('input[type="text"]');
    const divText = input.value;
    const newDiv = document.createElement('div');
    const text = document.createElement('div');
    text.appendChild(document.createTextNode(divText));
    newDiv.appendChild(text);
    newDiv.classList.add('mr-3','mt-3', 'd-flex', 'align-items-center', 'bg-green-300', 'p-3', 'rounded', 'shadow');
    newDiv.setAttribute('draggable', true);
    newDiv.addEventListener('dragstart', handleDragStart);
    newDiv.addEventListener('dragover', handleDragOver);
    newDiv.addEventListener('dragenter', handleDragEnter);
    newDiv.addEventListener('drop', handleDrop);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-outline-danger');
    deleteButton.addEventListener('click', handleDeleteDiv);
    newDiv.appendChild(deleteButton);
    const container = document.querySelector('.container');
    container.appendChild(newDiv);
    input.value = '';
  }

  



  return (
      <div className="container bg-blue-400 ">
        <div className="form-wrapper">
          <input type="text" className="form-control" placeholder="Dodaj zadanie" aria-label="Dodaj zadanie" aria-describedby="button-addon2"/>
            <button onClick={handleAddDiv} className="btn btn-outline-primary" type="button" id="button-addon2" data-mdb-ripple-color="dark">
              Button
            </button>
        </div>
            {divs.map((divText, index) => (
              <div key={index} className="mt-3 d-flex justify-content-between align-items-center">
                <div>{divText}</div>
            </div>
            ))}
      </div>
    
  );
};

export default Note;