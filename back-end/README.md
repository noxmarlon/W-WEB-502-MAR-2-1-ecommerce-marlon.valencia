
# E-COMMERCE

Le but de ce projet est de créer une plateforme de site marchand «high-tech», avec le maximum de fonc-
tionnalités. Il ne devra y être vendu que des composants informatiques. L’atout principal de votre site marc-
hand consistera à vendre du matériel dit "compatible"


## API product

### Create product

```http
  POST /api/product/create
```

#### headers params

| headers          | Type     | Description                                  |
| :--------------- | :------- | :------------------------------------------- |
| `x-access-token` | `string` | **Required**. admin token for create product |

#### body params

| body             | Type     | Description                              |
| :--------------- | :------- | :--------------------------------------- |
| `name`           | `string` | **Required**. name of the product        |
| `description`    | `string` | **Required**. description of the product |
| `price`          | `float`  | **Required**. price of the product       |
| `reduction`      | `iteger` | **Required**. reduction of the product   |
| `status`         | `enum`   | **Required**. state of the product (on_stock / out_of_stock)   |
| `photos`         | `files`  | **Required**. picture of the product     |

### update product

```http
  PUT /api/product/update/:id
```

#### URL params

| Parameter | Type      | Description                       |
| :-------- | :-------  | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of item to update |

#### headers params

| headers          | Type     | Description                                  |
| :--------------- | :------- | :------------------------------------------- |
| `x-access-token` | `string` | **Required**. admin token for create product |

#### body params

| body             | Type     | Description                              |
| :--------------- | :------- | :--------------------------------------- |
| `name`           | `string` | **Required**. name of the product        |
| `description`    | `string` | **Required**. description of the product |
| `price`          | `float`  | **Required**. price of the product       |
| `reduction`      | `iteger` | **Required**. reduction of the product   |
| `status`         | `enum`   | **Required**. state of the product (on_stock / out_of_stock)   |
| `photos`         | `files`  | **Required**. picture of the product     |

### delete specific product

```http
  DELETE /api/product/delete/:id
```

#### URL params

| Parameter | Type      | Description                       |
| :-------- | :-------  | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of item to update |

#### headers params

| headers          | Type     | Description                                  |
| :--------------- | :------- | :------------------------------------------- |
| `x-access-token` | `string` | **Required**. admin token for create product |

### delete all product

```http
  DELETE /api/product/delete_all
```

#### headers params

| headers          | Type     | Description                                  |
| :--------------- | :------- | :------------------------------------------- |
| `x-access-token` | `string` | **Required**. admin token for create product |

### Get all product

```http
  GET /api/product/
```

### Get specific product

```http
  GET /api/product/:id
```

#### URL params

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of item to fetch |


## Usage/Examples


#### Fetch all product
```javascript
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();

var config = {
  method: 'get',
  url: 'http://localhost:8000/api/product/',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```


## API Users

### Register user

```http
  POST /api/auth/signup
```

#### body params

| body             | Type     | Description                              |
| :--------------- | :------- | :--------------------------------------- |
| `email`          | `string` | **Required**. email of the user          |
| `password`       | `string` | **Required**. password of the user       |
| `role`           | `array`  | **optional**. role of the user (admin / user)      |

### login user

```http
  POST /api/auth/login
```

#### body params

| body             | Type     | Description                              |
| :--------------- | :------- | :--------------------------------------- |
| `email`          | `string` | **Required**. email of the user          |
| `password`       | `string` | **Required**. password of the user       |

### logout user

```http
  POST /api/auth/logout
```

#### headers params

| headers          | Type     | Description              |
| :--------------- | :------- | :------------------------|
| `x-access-token` | `string` | **Required**. user token |

## Usage/Examples


#### register user
```javascript
var axios = require('axios');
var data = JSON.stringify({
  "email": "test@test2.com",
  "password": "azeazeaz",
  "roles": [
    "admin"
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:8000/api/auth/signup',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
## Authors

- [@jennifer-kadri](https://www.github.com/jennifer-kadri)
- [@noxmarlon](https://www.github.com/noxmarlon)
- [@French09](https://www.github.com/French09)
- [@erwanepitech](https://www.github.com/erwanepitech)
- [@Antguitton](https://www.github.com/Antguitton)
