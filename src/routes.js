/* eslint-disable import/no-anonymous-default-export */
const host = '';

export default {
  notFoundPage: () => [host, '404'].join(''),
  cartPage: () => [host, 'cart'].join(''),
  getImagePath: (img) => [host, '../assets/images/products/', img].join(''),
};
