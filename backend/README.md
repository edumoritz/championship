<h2>Create Games</h2><br>

<li>The user shold inform both players and their goal balances</li>
<li>
The backend will update each player's score and if it reaches 60 points or more
it will create a new score for all registered players</li>

<h2>Routes</h2><br>
<h3>Login</h3>
<li><strong>POST: </strong>http://localhost:3333/sessions</li>


<h3>Create Player</h3>
<li><strong>POST: </strong>http://localhost:3333/players</li>

<h3>GET Player</h3>
<li><strong>GET: </strong>http://localhost:3333/players</li>
<li><strong>GET: </strong>http://localhost:3333/players/9c085cec-d8ed-4e95-b48e-e72759dea8e5</li>

<h3>Create Game</h3>
<li><strong>POST: </strong>http://localhost:3333/games</li>

<h3>GET Game</h3>
<li><strong>GET: </strong>http://localhost:3333/games</li>
<li><strong>GET: </strong>http://localhost:3333/games/9c085cec-d8ed-4e95-b48e-e72759dea8e5</li>

<h3>GET Scores</h3>

<li><strong>GET: </strong>http://localhost:3333/scores/93f32caf-94ce-4178-877f-aae82de40972</li>
<li><strong>GET: </strong>http://localhost:3333/scores</li>

