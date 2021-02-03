import axios from 'axios';

function GetLanguage(data) {
    return axios({
        method: 'post',
        url: `/getlanguages`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function Search(data) {
    return axios({
        method: 'post',
        url: `/search`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
function WeekMonth(data) {
    return axios({
        method: 'post',
        url: `/popular`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    GetLanguage,
    Search,
    WeekMonth,
}