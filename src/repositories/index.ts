import type { IDrink } from '@/utils/types'

export class Connector {
  static async getItems(pagination: number = 0, limit: number = 1): Promise<IDrink[]> {
    const uri = `http://localhost:3000/api/get-items?pagination=${pagination}&limit=${limit}`
    const response = await fetch(uri)
    const data = await response.json()
    return data
  }
}
