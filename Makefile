.PHONY: 2

2:
	md2review hajimeteno-deno.md > denobook02/hajimeteno-deno.re
	(cd denobook02; rake pdf; open book.pdf)
