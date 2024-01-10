import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import IDocument from "../types/interfaces/IDocument";
import { ToastContext } from "./toast-context";
import useAuth from "../hooks/useAuth";
import DocumentService from "../services/document.service";

interface IDocumentContext {
  document: IDocument | null;
  setDocument: Dispatch<SetStateAction<IDocument | null>>;
  errors: Array<string>;
  setErrors: Dispatch<SetStateAction<Array<string>>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  saving: boolean;
  setSaving: Dispatch<SetStateAction<boolean>>;
  currentUsers: Set<string>;
  setCurrentUsers: Dispatch<SetStateAction<Set<string>>>;
  setDocumentTitle: (title: string) => void;
  saveDocument: (updatedDocument: IDocument) => Promise<void>;
}

const defaultValues = {
  document: null,
  setDocument: () => {},
  errors: [],
  setErrors: () => {},
  loading: false,
  setLoading: () => {},
  saving: false,
  setSaving: () => {},
  currentUsers: new Set<string>(),
  setCurrentUsers: () => {},
  setDocumentTitle: () => {},
  saveDocument: async () => {},
};

export const DocumentContext = createContext<IDocumentContext>(defaultValues);

interface IDocumentProviderProps {
  children: JSX.Element;
}

export const DocumentProvider = ({ children }: IDocumentProviderProps) => {
  const { error } = useContext(ToastContext);
  const { accessToken } = useAuth();

  const [document, setDocument] = useState<IDocument | null>(
    defaultValues.document,
  );
  const [errors, setErrors] = useState<Array<string>>(defaultValues.errors);
  const [loading, setLoading] = useState<boolean>(defaultValues.loading);
  const [saving, setSaving] = useState<boolean>(defaultValues.saving);
  const [currentUsers, setCurrentUsers] = useState<Set<string>>(
    defaultValues.currentUsers,
  );

  const setDocumentTitle = (title: string) => {
    setDocument({ ...document, title } as IDocument);
  };

  const saveDocument = async (updatedDocument: IDocument) => {
    if (accessToken === null) return;

    setSaving(true);

    try {
      await DocumentService.update(accessToken, updatedDocument);
      setDocument(updatedDocument);
    } catch (error) {
      setErrors(["There was an error saving the document. PLease try again"]);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => {
        error(err);
      });
    }
  }, [errors]);

  return (
    <DocumentContext.Provider
      value={{
        document,
        setDocument,
        errors,
        setErrors,
        loading,
        setLoading,
        saving,
        setSaving,
        currentUsers,
        setCurrentUsers,
        setDocumentTitle,
        saveDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
