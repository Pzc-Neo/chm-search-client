import { get, post } from './request'

export const apiPublicGet = (params) => get('/public', params)
export const apiPublicPost = (params) => post('/public', params)

export const apiLogin = (params) => post('/login', params)
export const apiRegister = (params) => post('/register', params)

export const apiHomePost = (params) => post('/home', params)

export const apiUserPost = (params) => post('/user', params)

export const apiWebsitePost = (params) => post('/website', params)
export const apiWebsiteGroupPost = (params) => post('/websitegroup', params)

export const apiEnginePost = (params) => post('/engine', params)
export const apiEngineGroupPost = (params) => post('/enginegroup', params)

export const apiTagPost = (params) => post('/tag', params)
