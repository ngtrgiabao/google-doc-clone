import IDocumentUser from "./IDocumentUser";

interface IDocument {
  id: number;
  title: string;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  users: Array<IDocumentUser>;
  isPublic: boolean;
}

export default IDocument;
