const data = JSON.stringify([
    {
        "id": 0,
        "image": "https://raw.githubusercontent.com/liahrothstein/localStorage/main/image.png",
        "rating": 4,
        "title": "Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих",
        "author": "Адитья Бхаргава",
        "issueYear": "2019"
    },
    {
        "id": 1,
        "image": "https://raw.githubusercontent.com/liahrothstein/localStorage/main/image.png",
        "rating": 4,
        "title": "Программирование на JAVA",
        "author": "Патрик Нимейер, Дэниэл Леук",
        "issueYear": "2013"
    },
    {
        "id": 2,
        "image": "https://raw.githubusercontent.com/liahrothstein/localStorage/main/image.png",
        "rating": 5,
        "title": "Как создать сайт. Комикс-путеводитель по HTML, CSS и WordPress",
        "author": "Джи Ким, Нейт Купер",
        "issueYear": "2019"
    },
    {
        "id": 3,
        "image": "https://raw.githubusercontent.com/liahrothstein/localStorage/main/image.png",
        "rating": 5,
        "title": "HTML5 и CSS3. Разработка сайтов для любых браузеров и устройств",
        "author": "Бен Фрейн",
        "issueYear": "2014"
    },
    {
        "id": 4,
        "image": "https://raw.githubusercontent.com/liahrothstein/localStorage/main/image.png",
        "rating": 3,
        "title": "Adobe Flash. Создание аркад, головоломок и других игр с помощью ActionScript",
        "author": "Гэри Розенцвейг",
        "issueYear": "2009"
    },
    {
        "id": 5,
        "image": "https://raw.githubusercontent.com/liahrothstein/localStorage/main/empty-image.png",
        "rating": 3,
        "title": "Грокаем алгоритмы. Иллюстрированное ",
        "author": "Адитья Бхаргава",
        "issueYear": "2013"
    },
    {
        "id": 6,
        "image": "https://raw.githubusercontent.com/liahrothstein/localStorage/main/image.png",
        "rating": 2,
        "title": "HTML5. Разработка приложений для мобильных устройств",
        "author": "Эстель Вейл",
        "issueYear": "2015"
    },
    {
        "id": 7,
        "image": "https://raw.githubusercontent.com/liahrothstein/localStorage/main/image.png",
        "rating": 1,
        "title": "Быстро и легко создаем, программируем и раскручиваем",
        "author": "Олег Поломошнов",
        "issueYear": "2011"
    },
    {
        "id": 8,
        "image": "https://raw.githubusercontent.com/liahrothstein/localStorage/main/image.png",
        "rating": 1,
        "title": "Грокаем алгоритмы. Иллюстрированное пособие для програ...",
        "author": "Адитья Бхаргава",
        "issueYear": "2019"
    },
    {
        "id": 9,
        "image": "https://raw.githubusercontent.com/liahrothstein/localStorage/main/empty-image.png",
        "rating": null,
        "title": "Грокаем алгоритмы. Иллюстрированное ",
        "author": "Борис Пахомов",
        "issueYear": "2014"
    },
    {
        "id": 10,
        "image": "https://raw.githubusercontent.com/liahrothstein/localStorage/main/image.png",
        "rating": null,
        "title": "Грокаем алгоритмы. Иллюстрированное пособие для програ...",
        "author": "Адитья Бхаргава",
        "issueYear": "2019"
    }
]);

const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(data);
});

server.listen(undefined, 'https://liahrothstein.github.io/a-simple-web-server/')