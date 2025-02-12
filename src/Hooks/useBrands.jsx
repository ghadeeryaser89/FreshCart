import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useBrands() {

    const response = useQuery({
        queryKey:['brands'],
        queryFn: ()=> axios.get('https://ecommerce.routemisr.com/api/v1/brands'),
        select:(data)=> data.data.data,
        staleTime:20 * 1000
      })

  return response
}