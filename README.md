# Toodles

## Описание:
Генеративный чат-бот подобие ChatGPT. 

Создан на основе [дообученной модели ruGpt3-medium от Сбербанка.](https://huggingface.co/Parcurcik/toodles_essays)   




# Установка
## Клонируем репозиторий
    git clone git@github.com:Parcurcik/Toodles.git
## Подключение secrets-keys 

Для начала необходимо создать файл .env в корне проекта, прописать там все api-ключи доступа в таком формате:

    DATABASE_URI=
    JWT_SECRET_KEY=
    NAME_TABLE=

## Локальный запуск через виртуальное окружение

1. Необходимо перейти на server и в терминале прописать команды:

        python -m venv venv

        pip install -r requirements.txt

2. Необходимо перейти на frontend и в терминале прописать команды:

        npm install

        npm start
    


## Над проектом работала команда RTF-TEAM

Тимлид - [Худорожкова Е.Д](https://vk.com/hudorozhka)    
Дизайнер – [Хомуськов А.И](https://vk.com/s_khomuskov_7)  
Бэкенд/ML разработчик – [Безбородов П.А](https://vk.com/parcurcik)    [GitHub](https://github.com/Parcurcik) (Я)  
Фронтенд разработчик – [Проханов Г.О](https://vk.com/deadmonsterzap) [GitHub](https://github.com/Dzharvizzz-coder)     
  


