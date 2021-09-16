export interface UserBodyInterface {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  userPicture?: string;
}

export interface UserInterface extends UserBodyInterface {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  userPicture?: string;
  createdAt: Date;
}
