import "./css/style.css";
import TodoList from "./services/todoList";
import { TodoItem } from "./models/todoItem";
import ListTemplate from "./utils/ListaTemplate";
import { nanoid } from "nanoid";

//--------- PRÓBA --------------------------
// const item = new TodoItem('wwww', "Naplopás");
// const todoList = new TodoList();
// todoList.addItem(item);
// todoList.addItem(item2);
// todoList.load();
// -------------------------------------

function initApp(): void {
  const todoList = TodoList.instance;
  const template = ListTemplate.instance;  
 
  const taskAddForm = document.getElementById("taskAddForm")! as HTMLFormElement;

  // - Form submit ----
  taskAddForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
   
    const todoList = new TodoList();   
    todoList.load();

    const input = document.getElementById("newItem")! as HTMLInputElement;
    const newTask: string = input.value.trim();
    if (!newTask) return;

    const item = new TodoItem('wwww', "Naplopás");
    todoList.addItem(item);   

    const itemId:string = nanoid();    
    const elem = new TodoItem(itemId, newTask);
    
    todoList.addItem(elem);   
    todoList.save();
    location.reload();    
  });

  // Egész lista törlése gomb click-re
  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement;
  clearItems.addEventListener("click", (): void => {
    todoList.clearList();
    template.clear();
  });
 
  todoList.load();
  template.render(todoList);  
}
// Ha minden betöltödött az oldalon indítsa el az initApp függvényt
document.addEventListener("DOMContentLoaded", initApp);
