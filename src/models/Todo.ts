export interface Todo {
  id: string;
  title: string;
  description: string;
  status: Status;
}

export enum Status {
  pending = 'pending',
  wontdo = 'wontdo',
  done = 'done'
}