import IDocumentUser from "./IDocumentUser";

interface IDocument {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
  updated_at: string;
  userId: number;
  users: Array<IDocumentUser>;
  isPublic: boolean;
}

export default IDocument;