export interface IDrink {
  _id: string
  name: string
  description: string
  preparation: string
  ingredients: IIngredient[]
  tools: string[]
}

export interface IIngredient {
  type: string
  amount: string
}
