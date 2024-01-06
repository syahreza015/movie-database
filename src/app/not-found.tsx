import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { BiSolidError } from "react-icons/bi";

const NotFoundPage = () => {
  return (
    <main className="grid min-h-screen place-items-center">
    <div className="flex flex-col items-stretch gap-12 justify-start">
      <div className="flex items-center justify-center gap-4">
        <BiSolidError
          size={24}
          color="red"
        />
        <span className="text-2xl font-semibold text-red-600 capitalize">
          oops, page not found
        </span>
      </div>
      <div className="flex justify-around gap-4">
        <Link href={`/`} className="flex items-center justify-center gap-2 px-5 py-1 font-medium text-white capitalize bg-blue-700 rounded-full">
          <AiFillHome
            size={20}
            color="white"
          />
          back to home
        </Link>
      </div>
    </div>
  </main>
  );
};

export default NotFoundPage;
