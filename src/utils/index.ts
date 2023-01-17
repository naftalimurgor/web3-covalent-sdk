import axios, { AxiosHeaders } from 'axios'

export async function get(url: string, headers?: AxiosHeaders) {
    try {
        const result = await axios.get(url, { headers })
        return result
    } catch (error) {
        return error
    }
}
