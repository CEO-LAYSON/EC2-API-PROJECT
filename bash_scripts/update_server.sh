#!/bin/bash

LOG_FILE="/var/log/update.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
REPO_DIR="/home/ubuntu/EC2-API-PROJECT"

echo "[$TIMESTAMP] Starting system update..." >> $LOG_FILE

sudo apt update && sudo apt upgrade -y >> $LOG_FILE

cd $REPO_DIR
if git pull origin master >> $LOG_FILE; then
  sudo systemctl restart nginx
  echo "[$TIMESTAMP] Code updated and Nginx restarted." >> $LOG_FILE
else
  echo "[$TIMESTAMP] Git pull failed. Nginx not restarted." >> $LOG_FILE
fi
