/* eslint-disable linebreak-style */
import fetch from 'node-fetch';
/**
 *
 * @return {Object}
 */
async function currency() {
  const response = await fetch('https://v6.exchangerate-api.com/v6/c5cf7a73134853695922d5ba/latest/USD');
  const data = await response.json();
  const currencies = data['conversion_rates'];
  // console.log(currencies);
  const res = Object.values(currencies);
  console.log(res.sort(function(x, y) {
    return y-x;
  }));
};
currency();
