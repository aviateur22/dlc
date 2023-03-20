import todosSerialize from "./serialization/todosSerialize";

export default  {
  schema :{
    response: {
      200: todosSerialize
    }
  }
}