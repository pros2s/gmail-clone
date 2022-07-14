export interface IFolders {
  folders: string[],
  id: string
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
