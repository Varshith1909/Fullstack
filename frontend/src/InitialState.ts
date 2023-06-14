import {ProductType} from '@/PharmaTypes.ts';

const initialState: {price:ProductType[]; currentProduct: ProductType} = {
  currentProduct: getRandomProduct(),
  price: [getRandomProduct(), getRandomProduct()]
}

export default initialState;

export function getRandomProduct(): ProductType{
  const idNum = Math.random()*1000;
  
  return {
    imageUri: `https://loremflickr.com/300/300/drug=${idNum}`,
    name: "Medicine",
    price: 50,
    position: 'Rack 1',
    id:idNum
  }
}
