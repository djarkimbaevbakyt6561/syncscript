import {Room} from "../core/app/Room";
import {HomePage} from "../core/pages/home";

export default function Home() {
  return (
    <Room>
      <div className="min-h-screen mx-auto px-4 flex flex-col items-center">
        <HomePage />
      </div>
    </Room>
  );
}
