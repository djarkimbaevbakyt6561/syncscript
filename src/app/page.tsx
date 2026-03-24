import {Room} from "../core/app/Room";
import {Editor} from "../core/widget/editor";

export default function Home() {
  return (
    <Room>
      <div className="min-h-screen mx-auto my-4 flex flex-col items-center">
        <Editor />
      </div>
    </Room>
  );
}
