import axios, { AxiosHeaders } from 'axios'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get(url: string, headers?: AxiosHeaders) {
    try {
        const result = await axios.get(url, { headers })
        return result.data
    } catch (error) {
        return error
    }
}
