import { getDefaultCart } from '../Context/ShopContext';

describe('getDefaultCart', () => {
  test('should return an empty cart with quantities initialized to zero', () => {
    const defaultCart = getDefaultCart();
    expect(defaultCart).toEqual({});
  });
  
});
