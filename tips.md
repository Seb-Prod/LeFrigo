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

curl -X POST http://localhost:4000/auth/refresh -H "Content-Type: application/json" -d '{"refreshToken":"f25273a31f4d49381ee07825e19261b1c535bb33fdff39f2655b497639572e6644ad334d608fed783ba7e52afb8f0143d9e942e13d740aaa336647774ecad821"}'