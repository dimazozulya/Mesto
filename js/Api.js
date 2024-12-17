export default class Api {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    getUserInfo() {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          console.log('Данные из localStorage:', JSON.parse(storedUser));
          return Promise.resolve(JSON.parse(storedUser));
        }
      
        console.log('Запрос к серверу для получения данных пользователя');
        return fetch(`${this.baseUrl}/users/1`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then((userData) => {
            // Сохраняем полученные данные в localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
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
    updateUserInfo(data) {
        console.log('Отправляем данные на сервер:', data);
        return fetch(`${this.baseUrl}/users/1`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then((updatedData) => {
            console.log('Ответ сервера при обновлении пользователя:', updatedData);
      
            // Сохраняем обновлённые данные в localStorage
            const storedUser = JSON.parse(localStorage.getItem('user')) || {};
            const mergedData = { ...storedUser, ...updatedData }; // Объединяем старые и новые данные
      
            localStorage.setItem('user', JSON.stringify(mergedData));
            return mergedData; // Возвращаем данные из localStorage
          });
      }

      toggleLike(cardId, isLiked) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: cardId,
        likes: isLiked ? [] : [{ userId: 1 }], // Имитация лайков
      });
    }, 500); // Задержка для симуляции
  });
    }
    deleteCard(cardId){
        return fetch(`${this.baseUrl}/posts/${cardId}`, {
            method: 'DELETE',
        }).then((res) => {
            if(!res.ok){
                return Promise.reject(`Ошибка: ${res.status}`);
            }
        });
    }
}
