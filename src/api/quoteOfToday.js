import {ENDPOINTS} from "./endpoints"
import request from "./client"

export async function getQuoteOfToday(){
    return request(ENDPOINTS.QUOTE_TODAY);
}