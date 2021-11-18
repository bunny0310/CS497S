# <img src="https://static.thenounproject.com/png/407526-200.png" height="40" width="40"> Posts Service

1. This service is responsible for the retrieval of the current Trending Posts in the world.
2. Communicates directly with the database (eventually with Redis cache as well).
3. Implemented using Node.js Express
4. Responds to the following routes:

    - **/ (GET)** - Returns the top $(Limit) posts currently trending
       > [{
          "Latitude": 1.0,
          "Longitude": 1.0,
          "Description": "Random Value",
          "SecretKey": "hash123"
         }, {...}, {...}]
         
    - **/updateTrendingPosts (POST)** - Accepts JSON payload, returns an expanded updated top $(Limit) posts currently trending based on input payload.
       > [{
          "Latitude": 1.0,
          "Longitude": 1.0,
          "Description": "Random Value",
          "SecretKey": "hash123"
         }, {...}, {...}]

