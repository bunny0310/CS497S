#! /bin/sh
cd frontend
sh docker_clean.sh || true
sh docker_build_dev.sh || true
cd ..
cd backend
npm run docker_clean || true
npm run docker_build_dev || true