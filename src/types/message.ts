export interface ICompany {
  name: string,
  catchPhrase: string
};

export interface IMessage {
  id: number,
  name: string,
  email: string,
  company: ICompany
};

export interface IMessageContent {
  id: number | null,
  body: string
};
