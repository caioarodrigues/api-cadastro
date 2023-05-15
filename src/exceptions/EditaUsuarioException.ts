export class EditaUsuarioException extends Error {
    constructor(public message: string) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }