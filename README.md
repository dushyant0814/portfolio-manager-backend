# portfolio-manager-backend
## health check 
### responds with 200 status if the server is up.
```
curl --location --request GET 'http://localhost:3011/health'
```

## create user
### takes {name, username, email, password, mobile} as request parameters
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

## user login

### takes {email , password} as request parameters

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
curl --location --request PUT 'http://localhost:3011/orders/update-trade' \
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
