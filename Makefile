.PHONY: 2

2:
	md2review hajimeteno-deno.md > denobook2/hajimeteno-deno.re
	(cd denobook2; rake pdf; open book.pdf)
