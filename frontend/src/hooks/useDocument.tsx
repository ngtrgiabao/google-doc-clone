import { useContext, useEffect, useState } from "react";
import useAuth from "./useAuth";
import { ToastContext } from "../context/toast-context";
import IDocument from "../types/interfaces/IDocument";
import DocumentService from "../services/document.service";
import axios, { AxiosError } from "axios";

const useDocument = (documentId: number) => {
  const { accessToken } = useAuth();
  const { error } = useContext(ToastContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [document, setDocument] = useState<IDocument | null>(null);

  const loadDocument = async (accessToken: string, documentId: number) => {
    setLoading(true);

    try {
      const response = await DocumentService.get(accessToken, documentId);
      setDocument(response.data as IDocument);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError;
        if (response?.status === 404) {
          setErrors((prev) => [...prev, "Document does not exist"]);
        } else {
          setErrors((prev) => [
            ...prev,
            "An unknown error has occured. Please try again",
          ]);
        }
      } else {
        setErrors((prev) => [
          ...prev,
          "An unknown error has occured. Please try again",
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken === null) return;
    loadDocument(accessToken, documentId);
  }, [accessToken, documentId]);

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => {
        error(err);
      });
    }
  }, [errors]);

  return {
    loading,
    errors,
    document,
  };
};

export default useDocument;
