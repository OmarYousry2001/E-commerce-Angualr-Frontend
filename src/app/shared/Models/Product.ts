

export interface IProduct {
  name: string
  description: string
  newPrice: number
  oldPrice: number
  photos: IPhoto[]
  categoryName: string
  rating: number
  id: string
}

export interface IPhoto {
  imageName: string
  id: string
}