
const formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });

export default (amount: number) => formatter.format(amount);
