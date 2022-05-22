#!/bin/bash

# wait for postgresql start
sleep 60s
# Apply database migrations
python manage.py migrate

# Start server
python manage.py runserver 0.0.0.0:8000
