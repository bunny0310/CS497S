#! /bin/sh
config_docker_image_tag='loadbalancer_image'
config_docker_container_name='loadbalancer'
docker stop ${config_docker_container_name} && docker rm ${config_docker_container_name}
docker rmi ${config_docker_image_tag}