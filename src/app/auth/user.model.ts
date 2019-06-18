export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;
  email: string;
  privilege: number;

  constructor(){
    this.image = "";
    this.name = "";
    this.provider = "";
    this.email = "";
    this.privilege=0;
  }
}
