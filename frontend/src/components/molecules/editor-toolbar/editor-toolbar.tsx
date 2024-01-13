import { useContext } from "react";
import { EditorContext } from "../../../context/editor-context";
import { EditorState } from "draft-js";
import { IconButton } from "../../atoms/icon-button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { FontSelect } from "../../atoms/font-select";

const EditorToolbar = () => {
  const { editorState, setEditorState } = useContext(EditorContext);

  const handleUndoBtnClick = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const handleRedoBtnClick = () => {
    setEditorState(EditorState.redo(editorState));
  };

  return (
    <div className="w-full h-9 px-3 py-1 flex-shrink-0 flex items-center">
      <IconButton
        icon={<ArrowLeftIcon className="w-4 h-4" />}
        tooltip="Undo"
        onClick={handleUndoBtnClick}
      />
      <IconButton
        icon={<ArrowRightIcon className="w-4 h-4" />}
        tooltip="Redo"
        onClick={handleRedoBtnClick}
      />
      <div className="h-5 border-1 border-l-gray-300 mx-2"></div>
      <FontSelect />
    </div>
  );
};

export default EditorToolbar;
