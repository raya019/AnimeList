import axios from 'axios'
import axiosRetry from 'axios-retry'

const instance = axios.create({
  baseURL: 'https://api.jikan.moe/v4/',
})

axiosRetry(instance, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000
  },
})

export function getAnime(url) {
  return instance.get(url)
}
export function animeSearch(url) {
  return instance.get(url)
}
