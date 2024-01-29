

import { useEffect, useState } from 'react';
import './App.css';
import {message} from "antd"
import axios from "axios"
const Base_url="http://localhost:8000/api/v2/todus"
function App() {
const [newTodo,setNewTodo]=useState("")
const [todo,setTodo]=useState([])
const [popUpActive,setPopUpActive]=useState(false)

const fetchTodos=async()=>{
try{
  const todos= await axios.get(Base_url)
  // console.log("first",todos.data.Todos)

    setTodo(todos.data.Todos)
  
}
catch(err){
  console.log(err)
}
}


useEffect(()=>{

  fetchTodos()

},[])



const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`${Base_url}/${id}`);
    const deletedTodoId =await response.data.deleted?._id;

    if (deletedTodoId) {
      setTodo((todos) => todos.filter((todo) => todo._id !== deletedTodoId));
    } else {
      // Handle the case where the response doesn't contain a valid todo ID
      console.error('Todo not found or response structure is different.');
    }
  } catch (error) {
    // Handle any errors that occur during the delete request
    console.error('Error deleting todo:', error);
  }
};

const addTodo= async id=>{
  if(!newTodo){
message.warning("Please enter Task")
  }
  else{
    const data=await axios.post(`${Base_url}/new`,{
      "text":newTodo
    })
    const newTodovalue= await data.data
    if(data){
      setTodo([...todo,newTodovalue])
      setPopUpActive(false)
      setNewTodo("")
      console.log(data.data,"data")
    }
  }


}
const handleComplete= async id=>{
  const data=await axios.put(`${Base_url}/${id}`)
const dataId=await data.data.todo._id
const dataCompleted=await data.data.todo.completed
  setTodo((todos) => todos.map((todo) => {

    console.log({ids:todo._id,id:data._id})
    if (todo._id === dataId) {
      todo.completed = dataCompleted;
    }
    return todo;
  }));
}




console.log("first",todo)

  return (

    
    <div className="app">
 <h1>Welcome, Barani</h1>
 <h4>Your Tasks</h4>
 <section className='.todos'>
{
  todo.length>0?
  todo.map((todos)=>{

   return (

<article className={"todo "  + (todos.completed? "is-complete" : " ")} key={todos._id} >
<div className='checkbox'  onClick={()=>handleComplete(todos._id)}></div>
<div className='text'>{todos.text}</div>
<div className='delete-todo' onClick={()=>handleDelete(todos._id)}>X</div>

</article>
  )}):
  <h4 className='no-data'>No data</h4>
}
</section>



<div className="addPopup" onClick={() => setPopUpActive(true)}>+</div>

			{popUpActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopUpActive(false)}>X</div>
					<div className="content">
						<h3>Add Task</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className="button" onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
		


    </div>
  );
}

export default App;
