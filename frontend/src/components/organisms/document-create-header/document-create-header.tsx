import { DocumentSearchbar } from "../../atoms/document-searchbar";
import { UserDropDown } from "../../atoms/user-dropdown";

const DocumentCreateHeader = () => {
  return (
    <div className="w-full px-3 y-1 flex justify-between items-center">
      <h1>Logo</h1>
      <DocumentSearchbar />
      <UserDropDown />
    </div>
  );
};

export default DocumentCreateHeader;
