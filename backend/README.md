<h3>Login</h3>

<li><strong>POST: </strong>http://localhost:3333/sessions</li>
<strong>JSON</strong><br>

```json
{
	"email": "golias",
	"password": "123456"
}
```
<strong>Return</strong><br>

```json
{
  "player": {
    "id": "9e08886f-91f2-4caf-bc56-3ac1cd1b06a7",
    "name": "Golias",
    "email": "golias@gmail.com",
    "password": "$2a$08$MfMBB3cyZmfYOGiQqPzT4eucemc2N3XHPDq.98MQ6YcCcWegQMXvO",
    "created_at": "2020-11-14T17:09:23.004Z",
    "updated_at": "2020-11-14T17:09:23.004Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDU1NjQxNDIsImV4cCI6MTYwNTY1MDU0Miwic3ViIjoiOWUwODg4NmYtOTFmMi00Y2FmLWJjNTYtM2FjMWNkMWIwNmE3In0.aPSyxld0aR9CubXAD20tENY23-4v8yrke7ltEkjx1CA"
}
```

<h3>Create Player</h3>

<li><strong>POST: </strong>http://localhost:3333/players</li>
<strong>JSON</strong><br>

```json
{
	"name": "Golias",
	"email": "golias@gmail.com",
	"password": "123456"
}
```

<h3>Create Game</h3>

<li><strong>POST: </strong>http://localhost:3333/games</li>
<strong>JSON</strong><br>

```json
{
	"player1": "93f32caf-94ce-4178-877f-aae82de40972",
	"player2": "eaaa38c4-62f4-4af4-b71d-8114391f28a8",
	"goals_player1": 2,
	"goals_player2": 1
}
```

<li><strong>GET: </strong>http://localhost:3333/games</li>
<li><strong>GET: </strong>http://localhost:3333/games/9c085cec-d8ed-4e95-b48e-e72759dea8e5</li>

<h3>GET Scores</h3>

<li><strong>GET: </strong>http://localhost:3333/scores/93f32caf-94ce-4178-877f-aae82de40972</li>
<li><strong>GET: </strong>http://localhost:3333/scores</li>

```json
[
  {
    "id": "98e426db-c503-4ac9-a338-fcf10cf756b0",
    "points": 6,
    "games": 3,
    "wins": 2,
    "loss": 1,
    "ties": 0,
    "goal_pro": 5,
    "goal_against": 2,
    "goal_difference": 3,
    "utilization": "66.67",
    "player": {
      "id": "9e08886f-91f2-4caf-bc56-3ac1cd1b06a7",
      "name": "Golias",
      "email": "golias@gmail.com",
      "created_at": "2020-11-14T17:09:23.004Z",
      "updated_at": "2020-11-14T17:09:23.004Z"
    }
  },
]
```
