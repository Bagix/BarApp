export interface IDrink extends INewDrink {
  _id: string
}

export interface INewDrinkRaw {
  name: string
  description: string
  preparation: string
  ingredients: string
  tools: string
}

export interface INewDrink {
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

export interface IInsertConfirmation {
  acknowledged: boolean
  insertedId: string
}
