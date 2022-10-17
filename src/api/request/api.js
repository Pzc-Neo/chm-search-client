import { post } from './request'

export const apiLogin = (params) => post('/login', params)
export const apiRegister = (params) => post('/register', params)

export const apiHomePost = (params) => post('/home', params)

export const apiUserPost = (params) => post('/user', params)

export const apiWebsitePost = (params) => post('/website', params)
export const apiWebsiteGroupPost = (params) => post('/websitegroup', params)
