export class Auth {
  private username: string;
  private password: string;
  private admin: string;

  constructor(username: string, password: string, admin: string) {
    this.username = username;
    this.password = password;
    this.admin = admin;
  }

  getUsername(): string {
    return this.username;
  }
  getPassword(): string {
    return this.password;
  }
  getAdmin(): string {
    return this.admin;
  }
}
