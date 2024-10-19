import { TodoItem } from "../models/todoItem";
import LogMethod from "../decorators/logMethod";
import Toastify from 'toastify-js';

export type todoType = string | Date | number | boolean | undefined | null | Object;


// Singleton -  csak egyszer lehessen példányosítani
export default class TodoList<T> {  
  static instance: TodoList<Map<string, TodoItem<todoType>>> = new TodoList();
  private items: Map<string, TodoItem<T>> = new Map();
 
  @LogMethod
  addItem(item: TodoItem<T>): void {
    this.items.set(item.id, item);
    this.save();   
   
    if (typeof item.content === "object") {  
      console.log(item.content);
    } else {
      console.log(`Hozzáadva: ${item.id}-${item.content}`);
    }

    Toastify({
      text: `Hozzáadva a feladatokkhoz: ${item.content}`,
      duration: 8000,     
      close: true,
      gravity: "top",
      position: "right", 
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },      
    }).showToast();

  }

  get list(): Map<string, TodoItem<T>> {
    return this.items;
  }

  // Ha van már mentett feladat, azt betölti a local storage-ből
  load(): void {
    const storedList: string | null = localStorage.getItem("feladatok");

    if (typeof storedList !== "string") return; // Type guard

    const parsedList: object = JSON.parse(storedList);
    const result = Object.entries(parsedList);
    result.map((elem) => {      
      this.items.set(elem[0], elem[1]);
    });    
  }

  // Hogy ne vesszen el az egész lista, DB helyett local storage-be menti
  save(): void {
    const canSaved = Object.fromEntries(this.items);
    localStorage.setItem("feladatok", JSON.stringify(canSaved));
  }

  clearList(): void {
    this.items.clear();
    this.save();
  }

  removeItem(id: string) {
    this.items.delete(id);
    this.save();
  }
}
