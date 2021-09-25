#! /bin/sh
docker exec -it loadbalancer sh -c "cd /etc/nginx mv nginx.conf nginx-1.conf"
docker cp loadbalancer/nginx.conf loadbalancer:/etc/nginx/nginx.conf
x=$(docker exec -it loadbalancer sh -c "nginx -t")
status_code=$?
if [[ status_code -eq 0 ]]
then
    docker exec -it loadbalancer sh -c "nginx -s reload"
    echo "Config update successful"
else
    docker exec -it loadbalancer sh -c "cd /etc/nginx rm nginx.conf mv nginx-1.conf nginx.conf"
    echo ${x}
    echo "Errors in config file"
fi
