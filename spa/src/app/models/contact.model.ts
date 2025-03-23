export class Contact {
  constructor(
    public contactId: number | undefined,
    public lastName: string,
    public firstName: string,
    public phone: string,
    public email: string,
    public role: string
  ) {}
}
