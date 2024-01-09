import Perm from "../enums/perm";

interface IDocumentUser {
  perm: Perm;
  userId: number;
  documentId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    email: string;
  };
}

export default IDocumentUser;
