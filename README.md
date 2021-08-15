# portfolio-manager-backend
## 1. Description : Health Check
### responds with 200 status if the server is up.
```
curl --location --request GET 'https://portfolio-manager-101.herokuapp.com/health'
```

## 2. Description : Creates user with following parameters
#### **name : String**
#### **username : String**
#### **email : String**
#### **name : String**
#### **mobile : String**

## Method: POST
## Returns a default portfolio id assigned to the user
```
 curl --location --request POST 'https://portfolio-manager-101.herokuapp.com/auth/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "dushyant",
    "username": "dushyant",
    "email": "iamdushyant@gmail.com",
    "password": "dummy123",
    "mobile": "9415068051"
}' 
```

## 3. Description : Logs in user with following parameter
#### **password : String**
#### **email : String**
## Method: POST

## Returns a login token which will be used further in using trading APIs 
```
curl --location --request POST 'https://portfolio-manager-101.herokuapp.com/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email":"iamdushyant@gmail.com",
	"password":"dummy123"
}'
```

## 4. Description : User logout
#### **Authorization token : String**
## Method: DELETE

## Expires user authentication tokem

```
curl --location --request DELETE 'https://portfolio-manager-101.herokuapp.com/auth/logout' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnQ4NjVAc3ByaW5ncm9sZS5jb20iLCJpZCI6NSwibmFtZSI6ImR1c2h5YW50In0sImlhdCI6MTYyODgwMTg2MiwiZXhwIjoxNjMyNDAxODYyfQ.9sYiiVZN0DTwBP1AC8VegXYMWRwWv0dTgC8SM-uEFmE'
```

## 5. Description: Fetch securities with following parameters
#### **limit: Integer**
#### **offset: Integer**
## Method: GET
## Returns list of securities

```
curl --location --request GET 'https://portfolio-manager-101.herokuapp.com/list?limit=10&offset=0'
```

## 6. Description: Add security with following parameters
#### **name: String**
#### **ticker_symbol: String**
## Method: POST
## Returns security details

```
curl --location --request POST 'https://portfolio-manager-101.herokuapp.com/security/stock' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Redmi",
    "ticker_symbol": "RDM"
}'
```


## 7. Description: Create's trade with following parameters


#### **Authorization token : String**
#### **type: String**
#### **stock_id: Integer**
#### **price: Float**
#### **quantity: Integer**
## Method: POST

## Returns information related to the trade
```
curl --location --request POST 'https://portfolio-manager-101.herokuapp.com/orders/create-trade' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnRAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJkdXNoeWFudCJ9LCJpYXQiOjE2MjkwMjE2MzAsImV4cCI6MTYzMjYyMTYzMH0.9eqqN8LCu-b8N-GoTtAIvWoDSYsLkbiwnmvxAWxmiyQ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "BUY",
    "stock_id": 5,
    "price": 10,
    "quantity": 2
}'
```
## 8. Description: Update an existing trade


#### **Authorization token : String**
#### **type: String**
#### **stock_id: Integer**
#### **price: Float**
#### **quantity: Integer**

#### **trade_id: Integer**
## Method: PUT
## Returns updated trade information
```
curl --location --request PUT 'https://portfolio-manager-101.herokuapp.com/orders/trade' \
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
## 9. Description: Delete an existing trade
#### **Authorization token : String**
#### **trade_id: Integer**
## Method: DELETE
## Returns number of deleted entries

```
curl --location --request DELETE 'https://portfolio-manager-101.herokuapp.com/orders/remove-trade' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnRAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJkdXNoeWFudCJ9LCJpYXQiOjE2MjkwMjE2MzAsImV4cCI6MTYzMjYyMTYzMH0.9eqqN8LCu-b8N-GoTtAIvWoDSYsLkbiwnmvxAWxmiyQ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "trade_id": 9
}'

```

## 10. Description: Fetch existing trades
#### **Authorization token : String**
#### **limit: Integer**
#### **offset: Integer**
## Method: GET
## Returns trades that the user made with pagination

```
curl --location --request GET 'https://portfolio-manager-101.herokuapp.com/orders/trades?limit=10&page=0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnRAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJkdXNoeWFudCJ9LCJpYXQiOjE2MjkwMjE2MzAsImV4cCI6MTYzMjYyMTYzMH0.9eqqN8LCu-b8N-GoTtAIvWoDSYsLkbiwnmvxAWxmiyQ'
```

## 11. Description: Fetches return
#### **Authorization token : String**
## Fetches the return which the user makes on their portfolio
## Method: GET
### Note: Current price for each stock is 100 as per description of the task.

```
curl --location --request GET 'https://portfolio-manager-101.herokuapp.com/orders/returns' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnRAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJkdXNoeWFudCJ9LCJpYXQiOjE2MjkwMjE2MzAsImV4cCI6MTYzMjYyMTYzMH0.9eqqN8LCu-b8N-GoTtAIvWoDSYsLkbiwnmvxAWxmiyQ'
```


## 12. Description: Fetch portfolio
#### **Authorization token : String**
#### **limit: Integer**
#### **offset: Integer**
## Fetches user's portfolio
## Method: GET

```
curl --location --request GET 'https://portfolio-manager-101.herokuapp.com/orders/portfolio?limit=10&page=0' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiaWFtZHVzaHlhbnRAZ21haWwuY29tIiwiaWQiOjEsIm5hbWUiOiJkdXNoeWFudCJ9LCJpYXQiOjE2MjkwMjE2MzAsImV4cCI6MTYzMjYyMTYzMH0.9eqqN8LCu-b8N-GoTtAIvWoDSYsLkbiwnmvxAWxmiyQ'
```