#! /bin/sh
frontend_replicas=3
backend_replicas=3
docker-compose up -d --scale frontend=${frontend_replicas} --scale backend=${backend_replicas}
sh update_lb_conf.sh