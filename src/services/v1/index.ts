export default (routes: any, prefix: string) => {
  require('./public').default(routes, prefix)
  // require('./system').default(routes, prefix)
}