class CustomError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public publicMessage?: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.publicMessage = publicMessage ?? message;
  }
}

export default CustomError;
