import { useContext, useEffect, useState } from "react";
import IDocument from "../types/interfaces/IDocument";
import useAuth from "./useAuth";
import { ToastContext } from "../context/toast-context";
import DocumentService from "../services/document.service";

const useDocuments = () => {
  const { accessToken } = useAuth();
  const [documents, setDocuments] = useState<Array<IDocument>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { error } = useContext(ToastContext);

  const loadDocuments = async (accessToken: string) => {
    setLoading(true);

    try {
      const response = await DocumentService.list(accessToken);
      setDocuments(response.data as Array<IDocument>);
    } catch (err) {
      error("Unable to load documents. Please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken === null) return;
    loadDocuments(accessToken);
  }, [accessToken]);

  return {
    documents,
    loading,
    loadDocuments,
    setLoading,
  };
};

export default useDocuments;
