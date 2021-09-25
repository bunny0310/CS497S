#! /bin/sh
config_docker_container_name='frontend'
docker stop ${config_docker_container_name} && docker rm ${config_docker_container_name}