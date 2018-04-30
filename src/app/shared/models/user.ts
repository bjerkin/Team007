export interface Roles {
  reader: boolean;
  author?: boolean;
  admin?:  boolean;
}
export enum Role {
  USER,
  MANAGER,
  ADMIN
}

export class User {
  email:    string;
  photoURL: string;
  roles:    Roles;
  role: string;
  constructor(authData) {
    this.email    = authData.email
    this.photoURL = authData.photoURL
    this.roles    = { reader: true };
  }
}
/*export  class User {
  email: string;
  uid: string;
  username: string;
  name: string;
}
*/
