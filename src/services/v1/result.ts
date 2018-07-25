export default function (code: number = 0, message: string = '', data: any = {}) {
  return {
    code,
    message,
    data,
  }
}
