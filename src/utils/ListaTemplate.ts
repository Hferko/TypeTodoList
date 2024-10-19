import TodoList from '../services/todoList';
import { todoType } from '../services/todoList';
import { TodoItem } from '../models/todoItem';
import Toastify from 'toastify-js';

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(todoList: TodoList<Map<string, TodoItem<todoType>>>): void;
}

// -- SINGLETON CLASS --
export default class ListTemplate implements DOMList {   
  static instance:ListTemplate = new ListTemplate();
  
  ul: HTMLUListElement;
  private constructor() {
    this.ul = document.getElementById("listItems")! as HTMLUListElement;
  }

  render(todoList: TodoList<Map<string, TodoItem<todoType>>>): void {
    this.clear(); // Ne fűzze hozzá a újra az előző listához

    todoList.list.forEach((tennivalo) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = tennivalo.id.toString();      
      //check.checked = false;
      li.append(check);
      
      check.addEventListener('change', (event: Event) => {      
        const input = event.target as HTMLInputElement;
        console.log(`${tennivalo.content} lvégezve: ${input.checked}`);

        // Elvégezettnek minősíti a checked elemet
        Toastify({
          text: `${tennivalo.content} ELVÉGEZVE.`,
          duration: 3000,     
          close: true,
          gravity: "top",
          position: "right", 
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #0073e6, #0059b3)",
          },      
        }).showToast();
      })

      const label = document.createElement('label') as HTMLLabelElement;
      label.htmlFor = tennivalo.id.toString();
      label.textContent = tennivalo.content.toString();
      li.append(label);

      const button = document.createElement('button') as HTMLButtonElement;
      button.className = 'button';
      button.textContent = 'X';      
      li.append(button);

      button.addEventListener('click', () => {
        todoList.removeItem(tennivalo.id);
        this.render(todoList);
      });

      this.ul.append(li);
    });
  }

  clear(): void {
    this.ul.innerHTML = "";
  }
}