## stoker le token dans une variable

```bash
TOKEN=$(curl -s -X POST http://localhost:4000/auth/login -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"123456"}' | jq -r '.token')
```

## vérifier 

```bash
echo $TOKEN
```

curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json" -d '{"userName": "sebastien95","email": "sebastien@test.fr","password": "Password123!","confirmPassword": "Password123!","accept": true}'

curl "http://localhost:4000/auth/verify-email?token=6aafe5befeebc39f68b408a2b112f26d1cea0dc142d75f80c68e55e56ec7d909"