## stoker le token dans une variable

```bash
TOKEN=$(curl -s -X POST http://localhost:4000/auth/login -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"123456"}' | jq -r '.token')
```

## vérifier 

```bash
echo $TOKEN
```
## créer un compte

```bash
curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json" -d '{"userName": "sebt562m","email": "sebastien@test.com","password": "Password123!","confirmPassword": "Password123!","accept": true}'
```

## vérification email
```bash
curl "http://localhost:4000/auth/verify-email?token=14917efb480ce9b5e227a2d82e8a553927811c244dbf6a45e376f68a5a7c08a8"
```

## login
```bash
curl -X POST http://localhost:4000/auth/login -H "Content-Type: application/json" -d '{"email":"sebastien@test.com","password":"Password123!","rememberMe":true}'
```

## refresh
```bash
curl -X POST http://localhost:4000/auth/refresh -H "Content-Type: application/json" -d '{"refreshToken":"0efd3be85198506b1d4c6754425e38b77ed3489c16b093dc9505e0b9038f1c9e68c8e3c9a32584d722ef509f38bd0191f65bf9cff1d2ac6ca95add81c3aa6665"}'
```
## logout
```bash
curl -X POST http://localhost:4000/auth/logout -H "Content-Type: application/json" -d '{"refreshToken":"0efd3be85198506b1d4c6754425e38b77ed3489c16b093dc9505e0b9038f1c9e68c8e3c9a32584d722ef509f38bd0191f65bf9cff1d2ac6ca95add81c3aa6665"}'
```
## me
```bash
curl http://localhost:4000/auth/me -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNjgxMjJiZC1lMjMzLTQzNzItOTcxYi03MmY3ZTAzMGUyNzUiLCJpYXQiOjE3Nzk3MjE4OTUsImV4cCI6MTc3OTcyMjc5NX0.lOy75QIEJy94OmBYE70XqVpaSFxF8pba4LN7lX7EFbw"
``` 


curl -X POST http://localhost:4000/auth/forgot-password -H "Content-Type: application/json" -d '{"email":"sebastien@test.fr"}'


curl -X POST http://localhost:4000/auth/reset-password -H "Content-Type: application/json" -d '{"token":"a215d3f4eff3f3627589f139f972f6a3b0811e74f5815ba58b25bebca3b345cc","password":"NewPassword123!"}'


curl "http://localhost:4000/auth/verify-email?token=1b2c538dfa5a3bbacaaabb3d6b2c8d4d00ddcff38100bff21d6c61479f43dcbb%22"


curl -X POST http://localhost:4000/auth/forgot-password -H "Content-Type: application/json" -d '{"email":"noah@test.com"}'


curl -X POST http://localhost:4000/auth/reset-password -H "Content-Type: application/json" -d '{"token":"e50ecb6e240daa126743a125891dff27fb9c78be4957dd1f131757815f55fddb","password":"NewPassword123!","confirmPassword":"NewPassword123!"}'