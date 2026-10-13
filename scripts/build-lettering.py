from pathlib import Path
import json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
root=Path(__file__).resolve().parents[1]
font=TTFont(root/'node_modules/@fontsource/caveat/files/caveat-latin-500-normal.woff')
glyphs=font.getGlyphSet();cmap=font.getBestCmap();units=font['head'].unitsPerEm
rows=[]
for line_index,text in enumerate(['A sharper position','A clear customer journey','A connected operation','A team ready to deliver']):
 advance=0;line=[]
 for char in text:
  name=cmap.get(ord(char),'space');pen=SVGPathPen(glyphs,ntos=lambda value:format(value,'.2f').rstrip('0').rstrip('.'))
  glyphs[name].draw(TransformPen(pen,(78/units,0,0,-78/units,advance+20,85+line_index*80)))
  if pen.getCommands():line.append({'d':pen.getCommands(),'char':char})
  advance+=glyphs[name].width*78/units
 rows.append({'text':text,'glyphs':line})
(root/'components/data/handwriting.json').write_text(json.dumps(rows,separators=(',',':')))
font=TTFont(root/'node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-700-normal.woff')
glyphs=font.getGlyphSet();cmap=font.getBestCmap();advance=0;paths=[]
for char in '8 DAT':
 name=cmap.get(ord(char),'space');pen=SVGPathPen(glyphs,ntos=lambda value:format(value,'.2f').rstrip('0').rstrip('.'));glyphs[name].draw(TransformPen(pen,(1,0,0,1,advance,0)));paths.append(pen.getCommands());advance+=glyphs[name].width
(root/'components/data/signage.json').write_text(json.dumps({'paths':paths,'width':advance,'units':font['head'].unitsPerEm},separators=(',',':')))
