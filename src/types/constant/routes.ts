type IRoute = {
  path: string
  getURL: (slug: string) => string
}

export type IRoutes = {
  home: Omit<IRoute, 'getURL'>
}
