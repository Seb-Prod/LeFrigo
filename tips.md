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
curl -X POST http://localhost:4000/auth/refresh -H "Content-Type: application/json" -d '{"refreshToken":"61bdbf7f6efa96c0482fbe658f2905bec54b4d4451dd0625d1181e09efde83c04e5559f96eab42a6fd776120ddb538505a893d822f8d6b37a46fa88267357f16"}'
```


curl -X POST http://localhost:4000/auth/refresh -H "Content-Type: application/json" -d '{"refreshToken":"f25273a31f4d49381ee07825e19261b1c535bb33fdff39f2655b497639572e6644ad334d608fed783ba7e52afb8f0143d9e942e13d740aaa336647774ecad821"}'