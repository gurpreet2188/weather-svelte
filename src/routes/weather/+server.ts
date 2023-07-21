import { json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export function GET() {
    return json({ 'test': "" })
}

export async function POST({request}:RequestEvent){
   try {
    const res = await request.json()
    console.log(res)
    return json(res)
   } catch (e) {
    console.log(e)
    return json({"err":'err'})
   }
    
}