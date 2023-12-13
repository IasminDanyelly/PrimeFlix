import axios from 'axios'

 // BASE URL: 'https://api.themoviedb.org/3/'
 // URL DA API: '/movie/now_playing?api_key=da5f887279abe005361ccc3117b865e5&language=pt-BR'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;