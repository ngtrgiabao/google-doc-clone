import { CreateDocumentBtn } from "../../components/atoms/create-document-button";
import { Spinner } from "../../components/atoms/spinner";
import { DocumentList } from "../../components/molecules/documents-list";
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
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <DocumentList
            title="Recent Documents"
            documents={recentDocuments}
            setDocuments={setDocuments}
          />
          <DocumentList
            title="Shared Documents"
            documents={sharedDocuments}
            setDocuments={setDocuments}
          />
        </>
      )}
    </div>
  );
};

export default Create;
