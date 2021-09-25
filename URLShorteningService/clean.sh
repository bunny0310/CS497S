docker-compose down
if [[ $1 == "rmi" ]]
then
    if [[ $2 == "backend" || $2 == "" ]]
    then
        docker rmi urlshorteningservice_backend
    elif [[ $2 == "frontend" || $2 == "" ]]
    then
        docker rmi urlshorteningservice_frontend
    elif [[ $2 == "loadbalancer" || $2 == "" ]]
    then
        docker rmi urlshorteningservice_loadbalancer
    fi
fi