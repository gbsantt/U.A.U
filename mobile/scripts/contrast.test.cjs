const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const context={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/theme/colors.ts','utf8'),{
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}
}).outputText,context);
function luminance(hex){
 const rgb=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
 return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;
}
for(const [name,p] of [['claro',context.exports.colors],['escuro',context.exports.darkColors]]){
 test(`contraste de textos e botões no tema ${name} atinge 4,5:1`,()=>{
  const pairs=[['#FFFFFF',p.primary],[p.primaryDark,p.primaryLight],[p.text,p.surface],
   [p.textSecondary,p.background],[p.textSecondary,p.surface],[p.textSecondary,p.primaryLight],[p.danger,p.background]];
  for(const [fg,bg] of pairs){
   const a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
   assert.ok(ratio>=4.5,`${fg} sobre ${bg}: ${ratio.toFixed(2)}:1`);
  }
 });
}
