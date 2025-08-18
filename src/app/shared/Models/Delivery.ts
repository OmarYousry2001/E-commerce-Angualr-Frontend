
// export interface IGenericResponse {
//   statusCode: number
//   meta: any
//   succeeded: boolean
//   message: string
//   errors: any
//   type: number
//   data: IDelivery[]
// }

export interface IDelivery {
  name: string
  price: number
  deliveryTime: string
  description: string
  id: string
}
