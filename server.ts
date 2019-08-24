import { serve } from "https://deno.land/std@v0.12/http/server.ts";

window.onload = async () => { 
  const body = new TextEncoder().encode("Hello World\n")
  console.log('Server started!')
  for await (const req of serve(':8000')) {
    req.respond({ body })
  }
}
