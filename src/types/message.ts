export interface ICompany {
  name: string,
  catchPhrase: string
};

export interface IMessage {
  name: string,
  email: string,
  date: string,
  company: ICompany
};
