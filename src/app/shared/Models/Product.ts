export interface IGenericResponse<T> {
  statusCode: number;
  meta: any;
  succeeded: boolean;
  message: string;
  errors: any;
  type: number;
  data: T;
}

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