import { getRepository } from "typeorm";
import { Poll, User } from "../entity";

export interface IUserPayload {
  name: string;
  email: string;
  password: string;
  polls: Poll[] | null;
}

export const getUsers = async (): Promise<Array<User>> => {
  const userRepository = getRepository(User);
  return userRepository.find();
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User();
  return await userRepository.save({
    ...user,
    ...payload,
  });
};

export const getUserByID = async (id: number): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id: id });
  if (!user) return null;
  return user;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email: email });
  if (!user) return null;
  return user;
};
