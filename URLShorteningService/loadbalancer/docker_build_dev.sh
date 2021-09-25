#! /bin/sh
config_docker_image_tag='loadbalancer_image'
config_docker_container_name='loadbalancer'
config_docker_network_name='assignment2network'

docker network create --driver bridge ${config_docker_network_name} || true
docker build -t ${config_docker_image_tag} .
docker run -p 80:80 -it --rm --name=${config_docker_container_name} --net=${config_docker_network_name} ${config_docker_image_tag}