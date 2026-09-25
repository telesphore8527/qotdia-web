import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../api/categories"


export const useCategories = ()=>{
    return new useQuery({
        queryKey: ['quotes', 'categories'],
        queryFn: getCategories,
    })
}