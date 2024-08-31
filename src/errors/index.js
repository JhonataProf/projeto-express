export class ServerError extends Error {
  constructor(error) {
    super("Internal server error");
    this.name = error;
  }
}
