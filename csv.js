import { parse } from "https://deno.land/std/encoding/csv.ts";
window.onload = async () => {
  const result = await parse(`a,b,c
d,e,f`)
  console.log(result)
}
