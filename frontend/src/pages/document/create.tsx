import { CreateDocumentBtn } from "../../components/atoms/create-document-button";
import { DocumentCreateHeader } from "../../components/organisms/document-create-header";
import useAuth from "../../hooks/useAuth";
import useDocuments from "../../hooks/useDocuments";
import useWindowSize from "../../hooks/useWindowSize";

const Create = () => {
  const { heightStr } = useWindowSize();
  const { userId } = useAuth();
  const { documents, loading, setDocuments } = useDocuments();

  const recentDocuments =
    documents === null
      ? []
      : documents.filter((document) => document.userId === userId);
  const sharedDocuments =
    documents === null
      ? []
      : documents.filter((document) => document.userId !== userId);

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader />
      <CreateDocumentBtn />
    </div>
  );
};

export default Create;
