#! /bin/sh
cd frontend
sh docker_clean.sh || true
cd ..
cd backend
npm run docker_clean || true