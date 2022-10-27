// rcc ->  == class component skeleton
// rsc ->  == stateless component skeleton
// rsf->  == stateless named function skeleton
// More info: https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets



function capitalize(str: string): string {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

function capitalizeAll(str: string): string {
  let arrWords = str.split(' '),
    result = '';
  for (let i in arrWords) {
    const lower = arrWords[i].toLowerCase();
    result += arrWords[i].charAt(0).toUpperCase() + lower.slice(1) + (arrWords.length - 1 != parseInt(i) ? ' ' : '');
  }
  return result;
}

function becomeDollar(value: number): string {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(value);
}

function generateId(): number {
  return Math.round(Date.now() * (Math.random() * 10));
}

export { capitalize, capitalizeAll, becomeDollar, generateId };
