import axios from 'axios';

function GetLanguage(data) {
    return axios({
        method: 'post',
        url: `/getlangueges`,
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
function keywordofsearch(data) {
    return axios({
        method: 'post',
        url: `/keywordofsearch`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    GetLanguage,
    Search,
    keywordofsearch,
}