#! /bin/sh
config_docker_container_name='nginx_container'
config_docker_network_name='assignment2network'

docker network create --driver bridge ${config_docker_network_name} || true
docker run -p 80:80 -it --rm -d --name=${config_docker_container_name} --net=${config_docker_network_name} -v $(pwd):/usr/share/nginx/html nginx