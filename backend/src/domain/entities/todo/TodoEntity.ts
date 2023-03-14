/**
 * Entity Todo du domain
 */
class TodoEntity {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly status: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    id: string, 
    title: string, 
    description: string, 
    status: boolean,
    createdAt: Date,
    updatedAt: Date
    ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.updatedAt = updatedAt,
    this.createdAt = createdAt
  }
}

export { TodoEntity }