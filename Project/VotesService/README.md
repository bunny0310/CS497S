# Votes Service

---

Handles the addition and (eventually) removal of votes from a given post / comment. 

Uses Express to recieve incoming requests and sends queries to the database using mysql

Open Endpoints: /api/votes
Type: POST
Body: Json {"type" : {"post", "comment"}, "id" : int}
Returns 200 - Success, 500 - Error
