export interface ICompany {
  name: string,
  catchPhrase: string
};

export interface IMessage {
  name: string,
  email: string,
  company: ICompany
};
