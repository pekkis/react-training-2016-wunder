#!/usr/bin/env bash

trap 'kill_processes' INT

kill_processes() {
    trap '' INT TERM # ignore INT and TERM while shutting down
    echo "Killing client"
    kill $CLIENT_PID
    wait
    echo "Bye bye!"
    exit 0
}

cd client
yarn run start &
CLIENT_PID=$!
cd ../server
yarn run start
kill_processes
