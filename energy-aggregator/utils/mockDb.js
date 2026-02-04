export function generateSerialNumbers() {
  const serialNumbers = [];
  for (let i = 0; i < 500; i++) {
    const paddedNum = String(i).padStart(3, "0");
    serialNumbers.push(`SN-${paddedNum}`);
  }
  return serialNumbers;
}
