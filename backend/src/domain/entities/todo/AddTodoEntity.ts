import { TodoPropertyValidation } from "../../helpers/validator/TodoPropertyValidation";

/**
 * AddTodo Entité pour ajout d'un nouveau todo
 */
class AddTodoEntity implements AddTodoSchema {
  readonly title: string;
  readonly description: string;
  readonly status: boolean;

  constructor(title: string, description: string) {
    this.description = description;
    this.title = title;
    this.status = false;
    
    // Validation des propriétés de la todo
    new TodoPropertyValidation(this);
  }

}
export { AddTodoEntity }

// /**
//  * AddTodo Entité pour ajout d'un nouveau todo
//  */
// class AddTodoEntity implements AddTodoSchema {
//   readonly title!: string;
//   readonly description!: string;
//   readonly status: boolean=false;

//   constructor(object : Partial<AddTodoEntity>) {
//    for(const key of Object.keys(object)) {
//     // @ts-ignore
//     this[key] = object[key]
//    }
//   }

// }
// export { AddTodoEntity }

// mapper (data: object): EntityMapper<T> {
//   const useMapping = this.mapping.default
//   for (const key of Object.keys(useMapping)) {
//     this.data[key as keyof T] = data[useMapping[key as keyof object]]
//   }
//   return this
// }