import type { IDrink, INewDrink, IInsertConfirmation, IDeleteConfirmation } from '@/utils/types'

export class Connector {
  static async getItems(pagination: number = 0, limit: number = 1): Promise<IDrink[]> {
    const uri = `http://localhost:3000/api/get-items?pagination=${pagination}&limit=${limit}`
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
}
