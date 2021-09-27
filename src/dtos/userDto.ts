export interface UserDto {
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  status: boolean;
  google: boolean;
}

export interface UserUpdateDto extends Partial<UserDto> {
  _id: string;
}
