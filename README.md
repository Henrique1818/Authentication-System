<div align="center">
<img src="https://user-images.githubusercontent.com/56804642/97494386-ff804900-1944-11eb-83be-480431ca0037.png" alt="Project RestAPI" width="300" height="250">

<br />
<h2>Authentication System</h2>

<p><strong>Challenge proposed to create an APIRestFull, user authentication</strong></p>
</div>


---

### Index :bookmark_tabs:

1. [About project](#about)
    - [Demo project](#demo-project)
    - [Technologies used in the project](#technologies-used)
2. [How to use](#how-to-use)
    - [Requirements](#requirements)
    - [How to install](#how-to-install)

---

## About

Challenge proposed to create an APIRestFull, user authentication


---

## Demo Project

![Project Image](project-image)
![Project Image](project-image)
![Project Image](project-image)

> [Deploy Heroku](view-demo-project)

## Technology used

- **Frontend:** --

- **Backend:**
    - [Node.js](https://nodejs.org/en/)
    - Frameworks:
        - [Express.js](https://expressjs.com/)
    - Libraries, Packages and Package Managed:
        - [NPM](https://www.npmjs.com/)
        - [Nodemon](https://nodemon.io/)
        - [Body-parser](https://www.npmjs.com/package/body-parser)
        - [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
        - [JWT](https://jwt.io/)
        - [Jest](https://jestjs.io/)
        - [Supertest](https://www.npmjs.com/package/supertest)
        - [Mongoose](https://mongoosejs.com/)

- **Database:**
    - [MongoDB](https://www.mongodb.com/)
    - [Docker](https://www.docker.com/)

- **Deploy:**
    - [Heroku](https://www.heroku.com/)

---

## How to use

### Requirements

> Have [Node.js](https://nodejs.org/en/) installed on the machine.


### How to install

> 1. Download or clone the RestAPI repository

``` 
    git clone https://github.com/Henrique1818/RestAPI.git
```

> 2. Open the project in your preferred editor

> 3. In your terminal, install the necessary packages:

``` 
    yarn
```
or
``` 
    npm install
```

> 4. Installing the MongoDB using Docker
**check if the docker is already installed on the machine**

```
    docker run --name database -p 27017:27017 -d mongo
    docker run start database
    create a database name => RestAPI
```

> 5. Great! Now you can go to the RestAPI folder and start the server:
``` 
    cd RestAPI

    yarn start
```
or
``` 
    npm start
```

> 6. Open your browser! The RestAPI will be available at http://localhost:3000/singup

### EndPoints

> POST - Sing Up User: http://localhost:3000/singin

```
    {
        "nome": "henrique",
        "email": "henrique@teste.com",
        "senha": "123456",
        "telefones": [
            {
                "numero": 912345678,
                "DDD": 11
            },
            {
                "numero": 20202020,
                "DDD": 14
            }
        ]
    }
```

> GET - Sing In: http://localhost:3000/singup

```
    {
        "email": "henrique@teste.com",
        "senha": "123456"
    }
```

> GET - Seeking User: http://localhost:3000/:id


> PUT - Updating User: http://localhost:3000/henrique@teste.com

```
    {
        "nome": "Luiz henrique",
        "email": "henrique@teste.com",
        "senha": "1234",
        "telefones": [
            {
                "numero": 912345611,
                "DDD": 14
            }
        ]
    }

```

---


<div align="center">
<h3>Author</h3>

<br />
<p>
<a href="https://www.linkedin.com/in/luiz-henrique-23915916a/" target="_blank">Henrique :space_invader:</a>
</p>

<p align="center">
    <span>
        <a href="https://github.com/Henrique1818" target="_blank">Github</a>
    </span>
    |
    <span>
        <a href="https://www.instagram.com/henrique18_89/" target="_blank">Instagram</a>
    </span>
    :heart:
</p>
</div>
