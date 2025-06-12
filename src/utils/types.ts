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
  color: IColor | null
}

export interface IColor {
  label: string
  value: string
}

export interface INewDrink {
  name: string
  description: string
  baseAlcohol: string
  preparation: string
  ingredients: IIngredient[]
  tools: string[]
  taste: string
  color: IColor
}

export interface ISelectedFilters {
  filterName: string
  filterValues: string[]
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

export const colors = [
  { label: 'Czerwony', value: '#AA1B1F' },
  { label: 'Niebieski', value: '#005B8A' },
  { label: 'Zielony', value: '#3F7A36' },
  { label: 'Żółty', value: '#EDCB50' },
  { label: 'Fioletowy', value: '#633448' },
  { label: 'Rożówy', value: '#ffc0cb' },
  { label: 'Pomarańczowy', value: '#F09137' },
]
