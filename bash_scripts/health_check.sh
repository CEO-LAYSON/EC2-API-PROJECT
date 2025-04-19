#!/bin/bash

LOG_FILE="/var/log/server_health.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}')
MEMORY=$(free -m | awk '/Mem:/ { printf("%.2f"), $3/$2*100 }')
DISK=$(df / | awk 'END {print $5}' | sed 's/%//')

NGINX_STATUS=$(systemctl is-active nginx)

STUDENTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://51.21.251.240:5005/students)
SUBJECTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://51.21.251.240:5005/subjects)

echo "[$TIMESTAMP] CPU: ${CPU}% | MEM: ${MEMORY}% | DISK: ${DISK}% | NGINX: $NGINX_STATUS | /students: $STUDENTS_STATUS | /subjects: $SUBJECTS_STATUS" >> $LOG_FILE

if [ "$DISK" -gt 90 ]; then
  echo "[$TIMESTAMP] WARNING: Disk usage above 90%" >> $LOG_FILE
fi

if [ "$STUDENTS_STATUS" -ne 200 ] || [ "$SUBJECTS_STATUS" -ne 200 ]; then
  echo "[$TIMESTAMP] ERROR: One or more API endpoints returned non-200 response" >> $LOG_FILE
fi
