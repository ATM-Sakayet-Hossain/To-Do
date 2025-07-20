import React, { useState } from 'react';
import { getDatabase, push, ref, set } from "firebase/database";
import { database } from '../dbConfig.js'


function App() {
  const [itemName, setItemName] = useState('');
  const db = getDatabase();

const handelsubmit = (e) => {
  e.preventDefault();
  if (!itemName) {
    alert("Please enter an item name");
    return;
  }
  set(push(ref(db, 'toDoList/')), {
    itemName: itemName,
  });
  console.log("Item submitted:", itemName);
  setItemName(''); // Clear the input field after submission
}
  
  return (
    <>
      <form>
        <h1>Welcome to To-Do App</h1>
        <div>
          <label>Item Name</label>
          <input onChange={(e)=> setItemName(e.target.value)} type="text" name="itemName" id="itemName" />
          <button onClick={handelsubmit}>submit</button>
        </div>
      </form>
    </>
  )
}

export default App
