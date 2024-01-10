import validEnv from "@/lib/utils/env";
import { IoAlertCircleOutline } from "react-icons/io5";
import PopularClientList from "./list/popular";

const UpcomingListComponentPage = async() => {
    const response = await fetch(
        `${validEnv?.UPCOMING_MOVIE_ENDPOINT}?page=${1}`,
        {
          method: 'GET',
          cache: 'no-store',
          headers: {
            Authorization: `Bearer ${validEnv?.ACCESS_TOKEN}`,
          },
        }
      );    
      const result = await response.json()
      if (!response.ok) {
        return <div className="grid col-span-full place-items-center">
        <div className="flex items-center justify-center gap-2 px-4 py-1 rounded-md">
          <IoAlertCircleOutline
            size={20}
            color="red"
          />
          <span className="text-sm font-medium text-red-600 capitalize">
            failed to fetch data !
          </span>
        </div>
      </div>
      }
      const data: Movie[] = result.results
      
      return (<PopularClientList initialData={data}/>  );
}
 
export default UpcomingListComponentPage;