export type State = {
  currentProduct:ProductType,
  price: Array<ProductType>,
  description: Array<ProductType>
}


export type ProductType = {
  imageUri:string,
  price:number,
  name:string,
  id:number,
}
