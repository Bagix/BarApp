export interface IDrink extends INewDrink {
  _id: string
}

export interface IEditDrink extends IBaseDrink {
  _id: string
  ingredients: string
  image?: string
}

export interface INewDrinkRaw extends IBaseDrink {
  ingredients: string
  image?: File
}

export interface IColor {
  label: string
  value: string
}

export interface INewDrink extends IBaseDrink {
  ingredients: string[]
  image?: string
}

export interface IBaseDrink {
  name: string
  baseAlcohol: string
  description: string
  preparation: string
  taste: string
  tools: string
  decoration?: string
  color: IColor | null
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

export interface ICloudinaryUploadResponse {
  public_id: string
  url: string
}

export interface ICloudinaryDeleteResponse {
  result: string
}

export interface IDeleteConfirmation {
  acknowledged: boolean
  insertedId: string
}

export interface IDrinkCollection {
  items: IDrink[]
  isEndOfCollection: boolean
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
