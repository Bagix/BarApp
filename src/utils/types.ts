export interface IDrink extends INewDrink {
  _id: string
}

export interface IEditDrink extends INewDrinkRaw {
  _id: string
}

export interface INewDrinkRaw {
  name: string
  baseAlcohol: string
  description: string
  preparation: string
  ingredients: string
  tools: string
  taste: string
  color: string
}

export interface INewDrink {
  name: string
  description: string
  baseAlcohol: string
  preparation: string
  ingredients: IIngredient[]
  tools: string[]
  taste: string
  color: string
}

export interface IIngredient {
  type: string
  amount: string
}

export interface IInsertConfirmation {
  acknowledged: boolean
  insertedId: string
}

export interface IDeleteConfirmation {
  acknowledged: boolean
  insertedId: string
}

export const baseAlcohols = ['Whisky', 'Rum', 'Wódka', 'Gin', 'Likier']

export const flavors = ['Słodki', 'Kwaśny', 'Słodko-kwaśny', 'Wytrawny', 'Orzeźwiający']

export const colors = ['Czerwony', 'Niebieski', 'Zielony', 'Żółty', 'Fioletowy', 'Rożówy']
