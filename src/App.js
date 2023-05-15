import './App.css';
import Header from "./MyComponents/Header";
import {ToDos} from "./MyComponents/ToDos";
import {Footer} from "./MyComponents/Footer";
import {AddTodo} from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import React, { useState,useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  let initTodo;

  if(localStorage.getItem("todos")===null){
    initTodo=[];
  }
  else{ 
    initTodo=JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete=(todo)=>{
    console.log("I am onDelete",todo);
    // let index=todos.indexOf(todo);
    // todos.splice(index,1);
    setTodos(todos.filter((e)=>{
      return e!==todo
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  const addtodo=(title,desc)=>{
    console.log("I am adding this todo",title,desc);
    let sno;
    if(todos.length===0){
      sno=0;
    }
    else{
      let sno = todos[todos.length-1].sno +1;
    }
    
    const myTodo ={
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);

    
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  return (
    
    <>
    <Router>
      <Header title="My ToDos List" searchBar={false}/>
      <Switch>
          <Route exact path="/" render={()=>{
            return (
            <>
            <AddTodo addtodo={addtodo}/>
            <ToDos todos={todos} onDelete={onDelete}/>
            </>)
          }}>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          {/* // "react-router-dom": "^6.11.1", */}
        </Switch>
      
      <Footer/>
      </Router>
    </>
  );
}

export default App;
