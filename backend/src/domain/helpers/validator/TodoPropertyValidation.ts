import { ValidationException } from "../../../exceptions/ValidationException";

class TodoPropertyValidation<T> {

  protected todo: T;

  constructor(todo: T) {
    this.todo = todo;
    this.propertiesValidation();
  }

  /**
   * Validation des propriétés d'une todo
   */
  protected propertiesValidation() {
    let key: keyof typeof this.todo;

    
    for(key in this.todo) {

      switch(key) {
        // Identité
        case 'id':
          this.identityPropertyValidation(this.todo[key] as string);
        break;

        // Titre
        case 'title':          
          this.titlePropertyValidation(this.todo[key] as string);          
        break;

        // Description
        case 'description':
          this.descriptionPropertyValidation(this.todo[key] as string);
        break;

        // Status
        case 'status':
          this.statusPropertyValidation(this.todo[key] as boolean);
        break;
      }     
    }
  }

  /**
   * Validation du l'identité
   * @param {string} id 
   */
  identityPropertyValidation(id: string): void {
    if(id.trim().length < 1 ) {
      throw new ValidationException('error on todo identification');
    }
  }

  /**
   * Validation du titre
   * @param {string} title 
   */
  titlePropertyValidation(title: string): void {
    if(title.trim().length < 3 ) {
      throw new ValidationException('title is mandatory');
    }
  }

  /**
   * Validation de le descrtion
   * @param {string} description 
   */
  descriptionPropertyValidation(description: string): void {
    if(description.trim().length < 0 ) {
      throw new ValidationException('description is mandatory');
    }
  }

  /**
   * Validation du status
   * @param  {boolean} status 
   */
  statusPropertyValidation(status: boolean): void {
    if(status === null) {
      throw new ValidationException('status is mandatory');
    }
  }
}

export { TodoPropertyValidation }