import {ENDPOINTS} from "./endpoints"
import request from "./client"

export async function getDailyQuote(){
    return request(ENDPOINTS.QUOTE_TODAY);
}