## stoker le token dans une variable

```bash
TOKEN=$(curl -s -X POST http://localhost:4000/auth/login -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"123456"}' | jq -r '.token')
```

## vérifier 

```bash
echo $TOKEN
```

curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json" -d '{"userName": "sebt562m","email": "sebastien@test.com","password": "Password123!","confirmPassword": "Password123!","accept": true}'

curl "http://localhost:4000/auth/verify-email?token=14917efb480ce9b5e227a2d82e8a553927811c244dbf6a45e376f68a5a7c08a8"