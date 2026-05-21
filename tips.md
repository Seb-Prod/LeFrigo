## stoker le token dans une variable

```bash
TOKEN=$(curl -s -X POST http://localhost:4000/auth/login -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"123456"}' | jq -r '.token')
```

## vérifier 

```bash
echo $TOKEN
```


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYWVkZjBlZS02YzZmLTQzMWEtODM4OC0wZjJmZGIxNzA2YTQiLCJpYXQiOjE3NzkyNzA5MTUsImV4cCI6MTc3OTg3NTcxNX0.GcVZnyPTueOwam5Fi5hRx8qXbg9vXNs2DiyhcW5Yfqw

curl http://localhost:4000/recipes -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYWVkZjBlZS02YzZmLTQzMWEtODM4OC0wZjJmZGIxNzA2YTQiLCJpYXQiOjE3NzkyNzA4NTgsImV4cCI6MTc3OTg3NTY1OH0.XTBUI6ZNaZi9ahnTNafzPNCLWyKctsyOnOcqJKNQZpc"

curl -X POST http://localhost:4000/recipes -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYWVkZjBlZS02YzZmLTQzMWEtODM4OC0wZjJmZGIxNzA2YTQiLCJpYXQiOjE3NzkyNzA4NTgsImV4cCI6MTc3OTg3NTY1OH0.XTBUI6ZNaZi9ahnTNafzPNCLWyKctsyOnOcqJKNQZpc" -H "Content-Type: application/json" -d '{"name":"Lasagnes"}'


# validation
curl -X POST http://localhost:4000/recipes -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmYWVkZjBlZS02YzZmLTQzMWEtODM4OC0wZjJmZGIxNzA2YTQiLCJpYXQiOjE3NzkyNzA4NTgsImV4cCI6MTc3OTg3NTY1OH0.XTBUI6ZNaZi9ahnTNafzPNCLWyKctsyOnOcqJKNQZpc" -H "Content-Type: application/json" -d '{"name":""}'

curl -X DELETE http://localhost:4000/recipes/UUID_DE_LA_RECETTE -H "Authorization: Bearer $TOKEN$"


curl -X POST http://localhost:4000/meal-plans -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"date":"2025-11-15","mealType":"LUNCH","recipeId":"224e4df0-b579-4d58-90c7-55755c1f2c84"}'