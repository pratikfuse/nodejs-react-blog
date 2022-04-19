#!/bin/bash

# Wait until localstack says "Ready"
until cat /tmp/infra.log | grep Ready

do
  sleep .1
done

sleep 1


# Start up the stack!
awslocal cloudformation create-stack --template-body file:///opt/cloudformation-template.json --stack-name article-web

echo "Tables created"

# clear log file
cat /dev/null > /tmp/infra.log