import { useEffect, useState } from 'react';
import './index.css';

type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority
}

function App() {
  const [input , setInput]= useState("");
   const [priority , setPriority]= useState<Priority>("Moyenne");
   const savedTodos = localStorage.getItem("todos");
   const initalTodos = savedTodos? JSON.parse(savedTodos) : [];
   const [todos ,setTodos]= useState<Todo[]>(initalTodos);
   useEffect(()=>{
    localStorage.setItem("todos" , JSON.stringify(todos));
   }, [todos]);

   function addTodo(){
    console.log("Ajouter une tache");
    if(input.trim() ===""){
      return;
    }
    const newTodo : Todo ={
      id:Date.now(),
      text:input.trim(),
      priority:priority
    }
    const newTodos = [...todos , newTodo];
    setTodos(newTodos);
    setInput("");
    setPriority("Moyenne");
    console.log(newTodos);
   }
  return (
    <div className="flex justify-center">
      <div className='w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl'>
        <div className='flex  gap-4'>
          <input type="text" className='input w-full' placeholder='Ajouter une tache' value={input} onChange={(e)=>setInput(e.target.value)} />
        </div>
        <select className='select w-full' value={priority} onChange={(e)=>setPriority(e.target.value as Priority)}>
          <option value="Urgente">Urgente</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
        </select>
        <button className='btn btn-primary' onClick={addTodo}>
          Ajouter {todos.length}
        </button>

      </div>
    </div>
  )
}

export default App
