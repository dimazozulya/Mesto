export default class Api {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    getUserInfo(){
        return fetch(`${this.baseUrl}/users/1`).then(res => {
            if(res.ok){
                return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    getCards(){
        return fetch (`${this.baseUrl}/posts`).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    addCard(cardData) {
        return fetch (`${this.baseUrl}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: cardData.name,
                body: '',
                userID: 1,
            }),
        })
        .then((res) => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}
