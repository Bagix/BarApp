import type { IDrink, INewDrink, IInsertConfirmation } from '@/utils/types'

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
}
