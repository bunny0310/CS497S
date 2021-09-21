#! /bin/sh
config_docker_container_name='nginx_container'
docker stop ${config_docker_container_name} && docker rm ${config_docker_container_name}