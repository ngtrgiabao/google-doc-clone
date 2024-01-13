import { useParams } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import useDocument from "../../hooks/useDocument";
import { DocumentHeader } from "../../components/organisms/document-header";
import { useContext, useEffect, useRef } from "react";
import { DocumentContext } from "../../context/document-context";

const Document = () => {
  const { heightStr, widthStr } = useWindowSize();
  const { id: documentId } = useParams();
  const documentHeaderRef = useRef<null | HTMLDivElement>(null);

  const { loading, document } = useDocument(parseInt(documentId as string));
  const { setDocument } = useContext(DocumentContext);

  useEffect(() => {
    if (document !== null) setDocument(document);
  }, [document]);

  return (
    <div
      style={{ height: heightStr }}
      className="w-full h-full bg-gray flex flex-col"
    >
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <DocumentHeader documentHeaderRef={documentHeaderRef} />
        </>
      )}
    </div>
  );
};

export default Document;
