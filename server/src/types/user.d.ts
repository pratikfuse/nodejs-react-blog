interface IUserPhoto {
  value: string;
}

interface IUser {
  displayName: string;
  id: string;
  nodeId: string;
  photos: Array<IUserPhoto>;
  profileUrl: string;
  provider: string;
  username: string;
}
