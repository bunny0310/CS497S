# <img src="https://gitlab.developers.cam.ac.uk/uploads/-/system/group/avatar/1242/api.png" height="40" width="40"/> API Gateway

1. This service is responsible for routing all the incoming requests to the appropriate backend service.
2. It is exposed to the outside world.
3. It also serves as a load balancer and uses the least connection method to balance the incoming traffic.
4. It is implemented using Ngninx.
5. It listens to the following routes:
    - */posts_service*
    - */comments_service*
    - */votes_service*
    - */authentication_service*
