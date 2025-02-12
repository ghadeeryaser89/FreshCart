import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories() {

    const response = useQuery({
        queryKey:['categories'],
        queryFn: ()=> axios.get('https://ecommerce.routemisr.com/api/v1/categories'),
        select:(data)=> data.data.data,
        staleTime:20 * 1000
      })

  return response
}
