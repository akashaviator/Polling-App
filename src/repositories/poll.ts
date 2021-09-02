import { getRepository } from "typeorm";
import { Option, Poll, User } from "../entity";

export interface IPollPayload {
  id: number;
  active: boolean;
  created_at: Date;
  closed_at: Date;
  question: string;
  options: Option[];
  voters: object | null;
  user: User;
}

export const getPolls = async (): Promise<Array<Poll>> => {
  const pollRepository = getRepository(Poll);
  return pollRepository.find();
};

export const createPoll = async (payload: IPollPayload): Promise<Poll> => {
  const pollRepository = getRepository(Poll);
  const poll = new Poll();
  return pollRepository.save({
    ...poll,
    ...payload,
  });
};

export const getpollByID = async (id: number): Promise<Poll | null> => {
  const pollRepository = getRepository(Poll);
  const poll = await pollRepository.findOne({
    where: { id: id },
    relations: ["options"],
  });

  if (!poll) return null;

  return poll;
};
