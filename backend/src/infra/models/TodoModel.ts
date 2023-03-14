/**
 * Model Item issue de la base de données 
 */
class TodoModel {

  public readonly id: string;
  private _title: string;
  private _description: string;
  private _status: boolean;
  public readonly createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string, 
    title: string, 
    description: string, 
    status: boolean,
    createdAt: Date,
    updatedAt: Date
    ) {
    this.id = id;
    this._title = title;
    this._description = description;
    this._status = status;
    this._updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  // #region Setter et Getter

  public set description(description: string) {
    this._description = description
  }

  public get description(): string {
    return this._description;
  }

  public set title(title: string) {
    this._title = title
  }

  public get title(): string {
    return this._title;
  }

  public set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public set status(status: boolean) {
    this._status = status
  }

  public get status(): boolean {
    return this._status;
  }

  //#endregion  
}

export { TodoModel }
