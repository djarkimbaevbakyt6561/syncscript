import {Room} from "../../core/app/Room";
import {EditorPage as EditorPageFSD} from "../../core/pages/editor";

export default function EditorPage() {
  return (
    <Room>
      <div className="min-h-screen mx-auto px-4 flex flex-col items-center">
        <EditorPageFSD />
      </div>
    </Room>
  );
};
