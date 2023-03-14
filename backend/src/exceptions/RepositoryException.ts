class RepositoryException extends Error {
  constructor(message: string) {    
    super(message)
  }
}

export { RepositoryException }