import { backendBaseUrl } from '@/config'
import type {
  INewDrink,
  IInsertConfirmation,
  IDeleteConfirmation,
  ISelectedFilters,
  IDrinkCollection,
  ICloudinaryUploadResponse,
  ICloudinaryDeleteResponse,
} from '@/utils/types'

export class Connector {
  static async getItems(
    pagination: number = 0,
    limit: number = 1,
    filters: ISelectedFilters[],
  ): Promise<IDrinkCollection> {
    const jsonFilters = JSON.stringify(filters)
    const uri = `${backendBaseUrl}/api/get-items?pagination=${pagination}&limit=${limit}&filters=${jsonFilters}`
    const response = await fetch(uri)
    const data = await response.json()

    return data
  }

  static async addItem(item: INewDrink): Promise<IInsertConfirmation> {
    const uri = `${backendBaseUrl}/api/add`
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

  static async uploadImage(imageData: File): Promise<ICloudinaryUploadResponse> {
    const uri = `${backendBaseUrl}/api/upload-image`
    const formData = new FormData()
    formData.append('image', imageData)

    const response = await fetch(uri, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()
    return result
  }

  static async editItem(item: INewDrink): Promise<void> {
    const uri = `${backendBaseUrl}/api/edit`
    const response = await fetch(uri, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    await response.json()
  }

  static async editImage(oldImageId: string, imageData: File): Promise<void> {
    console.log('Editing image...')
    const uri = `${backendBaseUrl}/api/edit-image`
    const formData = new FormData()
    formData.append('image', imageData)
    formData.append('public_id', oldImageId)

    await fetch(uri, {
      method: 'POST',
      body: formData,
    })
  }

  static async deleteItem(id: string): Promise<IDeleteConfirmation> {
    const uri = `${backendBaseUrl}/api/delete`
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

  static async deleteImage(publicId: string): Promise<ICloudinaryDeleteResponse> {
    const uri = `${backendBaseUrl}/api/delete-image`
    const response = await fetch(uri, {
      method: 'DELETE',
      body: JSON.stringify({ public_id: publicId }),
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
    const uri = `${backendBaseUrl}/api/search?search=${searchPhrase}&pagination=${pagination}&limit=${limit}`
    const response = await fetch(uri)
    const data = await response.json()

    return data
  }
}
