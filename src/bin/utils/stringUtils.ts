const ENGLISH_SYMBOLS = [
  [48, 57], //  numbers
  [61, 90], // Capitals
  [97, 122] // Small
];

function isIncludedInList(ansi: number): boolean{
  for(const ar of ENGLISH_SYMBOLS){
    if(ansi < ar[0] || ansi > ar[1])
      return false;
  }
  return true;
}

export function trimToEnglish(str: string, includeLetters?:string): string{
  let result: string = "";
  for(let i = 0; i < str.length; i++){
    const cAnsi = str.charCodeAt(i);
    if(isIncludedInList(cAnsi) || includeLetters?.split('')?.filter(x => x.charCodeAt(0) == cAnsi))
      result += str[i];
  }
  return result;
}