import Perm from "../types/enums/perm";
import API from "./api";

const DocumentUserService = {
  create: (
    accessToken: string,
    payload: {documentId: number, email: string, perm: Perm}
  ) => {
      return API.post(`/document/${payload.documentId}/share`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    },
    delete: (accessToken: string, payload: {documentId: number, userId: number}) => {
      return API.delete(`/document/${payload.documentId}/share/${payload.userId}`, {headers: {Authorization: `Bearer ${accessToken}`}})
    }
}

export default DocumentUserService