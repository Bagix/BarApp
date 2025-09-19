import type {
  INewDrink,
  IInsertConfirmation,
  IDeleteConfirmation,
  ISelectedFilters,
  IDrinkCollection,
} from '@/utils/types'

export class Connector {
  static async getItems(
    pagination: number = 0,
    limit: number = 1,
    filters: ISelectedFilters[],
  ): Promise<IDrinkCollection> {
    const jsonFilters = JSON.stringify(filters)
    const uri = `http://localhost:3000/api/get-items?pagination=${pagination}&limit=${limit}&filters=${jsonFilters}`
    const response = await fetch(uri)
    const data = await response.json()

    return data
  }

  static async addItem(item: INewDrink): Promise<IInsertConfirmation> {
    const uri = 'http://localhost:3000/api/add'
    const response = await fetch(uri, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return data
  }

  static async editItem(item: INewDrink): Promise<IInsertConfirmation> {
    const uri = 'http://localhost:3000/api/edit'
    const response = await fetch(uri, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return data
  }

  static async deleteItem(id: string): Promise<IDeleteConfirmation> {
    const uri = `http://localhost:3000/api/delete`
    const response = await fetch(uri, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return data
  }

  static async searchItemsByName(
    pagination: number = 0,
    limit: number = 1,
    searchPhrase: string,
  ): Promise<IDrinkCollection> {
    const uri = `http://localhost:3000/api/search?search=${searchPhrase}&pagination=${pagination}&limit=${limit}`
    const response = await fetch(uri)
    const data = await response.json()

    return data
  }
}
