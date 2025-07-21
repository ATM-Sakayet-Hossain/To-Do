import React, { useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { database } from '../dbConfig.js'


function App() {
  const [itemName, setItemName] = useState('');
  const [itemList, setItemList] = useState([]);
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
  setItemName(''); // Clear the input field after submission
}
useEffect(()=>{
onValue(ref(db, 'toDoList'), (snapshot) => {
  let data = [];
  snapshot.forEach((item) => {
    data.push({...item.val(), id: item.key });    
  })
  setItemList(data)
});
},[])

console.log(itemList);

  return (
    <>
      <form>
        <h1>Welcome to To-Do App</h1>
        <div>
          <label>Item Name</label>
          <input onChange={(e)=> setItemName(e.target.value)} type="text" name="itemName" id="itemName" />
          <button onClick={handelsubmit}>submit</button>
        </div>
        <div>
          <h2>Item Name:</h2>
          {itemList.map((item) => (
            <ul key={item.id}>
              <li>{item.itemName}</li>
            </ul>
          ))}
        </div>
        
      </form>
    </>
  )
}

export default App
