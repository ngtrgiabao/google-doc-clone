import IDocument from "../../../types/interfaces/IDocument"
import { DocumentCard } from "../../atoms/document-card"

interface DocumentListProps {
  title: string,
  documents: Array<IDocument>
  setDocuments: () => void
}

const DocumentList = ({
  title,
  documents,
  setDocuments
}: DocumentListProps) => {
  return (
    <div className="w-full flex justify-center items-center font-medium text-gray-700 p-4">
      <p className="w-full max-w-4xl space-y-4">
        <h1>{title}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {documents
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                setDocuments={setDocuments}
              />
            ))}
        </div>
      </p>
    </div>
  )
}

export default DocumentList