export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface ITask {
  [key: string]: string | number | null;
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[] | null;
}

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type TUserToResponse = Omit<IUser, 'password'>;

export type TColumnBody = Partial<IColumn>;

export type TTaskBody = Partial<ITask>;

export type TBoardBody = Partial<IBoard>;

export type TUserBody = Partial<IUser>;

export interface IDatabase {
  users: IUser[];
  boards: IBoard[];
  tasks: ITask[];
}

export interface IRepository<T> {
  entities: T[]

  getAll: () => Promise<T[]>;

  getById: (id: string) => Promise<T>

  create: (entityBody: Partial<T>) => Promise<T>;

  update: (entityBody: Partial<T>) => Promise<T>;

  delete: (entityId: string) => Promise<T>;
}

export interface IRepositoryExtended<T> {
  entities: T[]

  getAll: () => Promise<T[]>;

  getAllFromUser: (containerId: string) => Promise<T[]>;

  getAllFromBoard: (containerId: string) => Promise<T[]>;

  getById: (id: string, containerId: string) => Promise<T>

  create: (entityBody: Partial<T>, containerId: string) => Promise<T>;

  update: (entityBody: Partial<T>, containerId: string) => Promise<T>;

  delete: (entityId: string, containerId: string) => Promise<T>;
}
