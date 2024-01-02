import { body } from "express-validator";
import PermEnum from "../types/enums/perm.enum";

class ShareValidator {
  public create = [
    body("email")
      .optional()
      .normalizeEmail()
      .withMessage("Must provide a valid email to share this document with."),
    body("permission").custom((value) => {
      if (!Object.values(PermEnum).includes(value)) {
        throw new Error("Must provide a valid document permission");
      }
      return true;
    }),
  ];
}

const shareValidator = new ShareValidator();

export { shareValidator };
