import * as api from '../api'
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, history) => async (disptach) => {
    try {
        const { data } = await api.signIn(formData)
        disptach({ type: AUTH, data })
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, history) => async (disptach) => {
    try {
        const { data } = await api.signup(formData)
        disptach({ type: AUTH, data })
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}