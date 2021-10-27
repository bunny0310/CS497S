# <img src="https://cdn0.iconfinder.com/data/icons/free-daily-icon-set/512/Comments-512.png" height="40" width="40"> Comments Service

1. This service is responsible for the retrieval and creation of comments.
2. Communicates directly with the database (eventually with Redis cache as well).
3. Implemented using .NET Core and Entity Framework Core.
4. Responds to the following routes:

    - **/api/Comments/Create (POST)** - Accepts JSON payload, creates a new comment
       > {
          "Latitude": 1.0,
          "Longitude": 1.0,
          "Value": "Random Value",
          "PostId": 20,
          "SecretKey": "hash123"
         }
    - **/api/Comments/Comments/<PostId> (GET)** - Accepts the post's id as a route variable and returns a list of all comments linked with a post
     
