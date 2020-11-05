## Разверстка приложения через докер

### Этап 0. Подготовка host для разверстки.

Необходимо установить пакеты: 
 - [Docker](https://docs.docker.com/get-docker/)
 - [Docker-Compose](https://docs.docker.com/compose/install/)
 - Nginx
 - *[Certbot](https://certbot.eff.org/)

### Этап 1. Подготовка docker-compose конфигов 

Если для проекта используется CI и собранные docker containers хранятся в container registry, то этот шаг можно пропустить. 

В ином случае необходимо в docker-compose.*.yml заменить строчку `image:` на `build:`, чтобы собирать контейнеры локально. Пример такого конфига можно увидеть в `deployment/docker-compose-config `


### Этап 2. Сборка docker containers

Если для проекта используется CI и собранные docker containers хранятся в container registry, то этот шаг можно пропустить. 

В ином случае необходимо запустить команду:

`docker-compose -f {назвение docker-compose конфига} build`


### Этап 3. Запуск проекта

Перед стартом необходимо убедиться, что переменные среды / enviroment variables (которые указаны в docker-compose.*.yml) указаны верно. 

Запуск контейнеров:

`docker-compose -f {назвение docker-compose конфига} up -d`

Проверить запущенные контейнеры:

`docker ps`

Логи запущенных контейнеров:

`docker logs {container ID}`


### Этап 4. Настройка nginx и получение SSL сертификата

Необходимые конфиги можно найти в deployment/nginx

nginx.conf нужно скопировать в /etc/nginx/
*.nginx.conf нужно скопировать в /etc/nginx/sites-enabled/

Если для проекта нужен SSL сертификат, то можно его получить через certbot:

`certbot --nginx` 


