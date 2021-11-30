function calculateAPY(interest: number, compoundingPeriod: number): number {
  const percentageRate = interest / 100;
  let apy = (1 + percentageRate / compoundingPeriod) ** compoundingPeriod;
  apy = (apy - 1) * 100;

  return Math.round(apy * 10 ** 3) / 10 ** 3;
}
