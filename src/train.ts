function calculate(expr: string): number {
  return expr
    .split("+")
    .map((part) => Number(part.trim()))
    .reduce((sum, n) => sum + n, 0);
}

console.log(calculate("1+3"));

export {};
