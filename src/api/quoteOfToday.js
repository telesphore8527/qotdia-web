import {ENDPOINTS} from "./endpoints"
import request from "./client"

export async function fetchDailyQuote(){
    return request(ENDPOINTS.QUOTE_TODAY);
}