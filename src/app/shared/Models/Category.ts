

export interface IGenericResponse {
  statusCode: number
  meta: any
  succeeded: boolean
  message: string
  errors: any
  type: number
  data: ICategory[]
}

export interface ICategory {
  name: string
  description: string
  id: string
}
