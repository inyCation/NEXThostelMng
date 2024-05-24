import { cookies } from "next/headers";
export const authToken = cookies().get("userAuthToken")?.value;