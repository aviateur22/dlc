/**
 * Exception Todo not find
 */
class TodoNotFindException extends Error {
  constructor(message: string) {
    super(message);
  }
}
export {TodoNotFindException}