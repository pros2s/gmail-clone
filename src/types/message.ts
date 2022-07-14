export interface IFolders {
  id: string,
  folders: string[]
}

export interface IMessage {
  id: string,
  name: string,
  email: string,
  username: string
};

export interface IMessageContent {
  id: string | null,
  body: string,
  date?: string
};
