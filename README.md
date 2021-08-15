# portfolio-manager-backend
## health check 
### responds with 200 status if the server is up.
```
curl --location --request GET 'http://localhost:3011/health'
```

## Description : Creates user with following parameters
#### **name : String**
#### **username : String**
#### **email : String**
#### **name : String**
#### **mobile : String**

## Method: POST
## Returns a default portfolio id assigned to the user
```
 curl --location --request POST 'http://localhost:3011/auth/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "dushyant",
    "username": "dushyant",
    "email": "iamdushyant@gmail.com",
    "password": "dummy123",
    "mobile": "9415068051"
}' 
```

## Description : User login
#### **password : String**
#### **email : String**
## Method: POST

## Returns a login token which will be used further in using trading APIs 
```
curl --location --request POST 'http://localhost:3011/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email":"iamdushyant@gmail.com",
	"password":"dummy123"
}'
```

## user logoout
### takes {Bearer token} as request parameters

```
curl --location --request DELETE 'http://localhost:3011/auth/logout' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnQ4NjVAc3ByaW5ncm9sZS5jb20iLCJpZCI6NSwibmFtZSI6ImR1c2h5YW50In0sImlhdCI6MTYyODgwMTg2MiwiZXhwIjoxNjMyNDAxODYyfQ.9sYiiVZN0DTwBP1AC8VegXYMWRwWv0dTgC8SM-uEFmE'
```

## create trade

### takes {type, stock_id, price, quantity, Bearer token} as request parameters

```
curl --location --request POST 'http://localhost:3011/orders/create-trade' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnRAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJkdXNoeWFudCJ9LCJpYXQiOjE2MjkwMjE2MzAsImV4cCI6MTYzMjYyMTYzMH0.9eqqN8LCu-b8N-GoTtAIvWoDSYsLkbiwnmvxAWxmiyQ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "BUY",
    "stock_id": 5,
    "price": 10,
    "quantity": 2
}'
```
## update trade
### takes {type, stock_id, price, quantity, trade_id, Bearer token} as request parameters

```
curl --location --request PUT 'http://localhost:3011/orders/trade' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnRAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJkdXNoeWFudCJ9LCJpYXQiOjE2MjkwMjE2MzAsImV4cCI6MTYzMjYyMTYzMH0.9eqqN8LCu-b8N-GoTtAIvWoDSYsLkbiwnmvxAWxmiyQ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "BUY",
    "stock_id": 4,
    "price": 3,
    "quantity": 3,
    "trade_id": 8
}'
```
## delete trade
### takes {trade_id} as request paramerts

```
curl --location --request DELETE 'http://localhost:3011/orders/remove-trade' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnRAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJkdXNoeWFudCJ9LCJpYXQiOjE2MjkwMjE2MzAsImV4cCI6MTYzMjYyMTYzMH0.9eqqN8LCu-b8N-GoTtAIvWoDSYsLkbiwnmvxAWxmiyQ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "trade_id": 9
}'

```

### fetch user trades
### takes {limit, offset} as request parameters

```
curl --location --request GET 'http://localhost:3011/orders/trades?limit=10&page=0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnRAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJkdXNoeWFudCJ9LCJpYXQiOjE2MjkwMjE2MzAsImV4cCI6MTYzMjYyMTYzMH0.9eqqN8LCu-b8N-GoTtAIvWoDSYsLkbiwnmvxAWxmiyQ'
```

### fetch returns for a user

### takes {} as request parameters

```
curl --location --request GET 'http://localhost:3011/orders/returns' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnRAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJkdXNoeWFudCJ9LCJpYXQiOjE2MjkwMjE2MzAsImV4cCI6MTYzMjYyMTYzMH0.9eqqN8LCu-b8N-GoTtAIvWoDSYsLkbiwnmvxAWxmiyQ'
```

### fetch user's portfolio

### takes {limit, offset} as request parameters

```
curl --location --request GET 'http://localhost:3011/orders/fportfolio?limit=10&page=0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnRAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJkdXNoeWFudCJ9LCJpYXQiOjE2MjkwMjE2MzAsImV4cCI6MTYzMjYyMTYzMH0.9eqqN8LCu-b8N-GoTtAIvWoDSYsLkbiwnmvxAWxmiyQ'
```