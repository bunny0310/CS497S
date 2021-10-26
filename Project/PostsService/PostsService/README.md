# <img src="https://static.thenounproject.com/png/1087123-200.png" height="40" width="40"> Posts Service

1. This service is responsible for the retrieval and creation of Posts.
2. Communicates directly with the database (eventually with Redis cache as well).
3. Implemented using .NET Core and Entity Framework Core.
4. Responds to the following routes:

    - **/api/Posts/Create (POST)** - Accepts JSON payload, creates a new post
       > {
          "Latitude": 1.0,
          "Longitude": 1.0,
          "Description": "Random Value",
          "SecretKey": "hash123"
         }
         
    - **/api/Posts/GetNearby (POST)** - Accepts JSON payload, returns a list of all the posts that within a certain proximity to the requesting user
       > {
          "Latitude": 1.0,
          "Longitude": 1.0,
          "Miles": 5
         }
         
    - **/api/Posts/GetTrending (GET)** - Returns top 30 Posts from last week that have received more than 100 upvotes
     
