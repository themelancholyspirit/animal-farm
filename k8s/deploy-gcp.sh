#!/bin/bash

gcloud compute addresses create animal-farm-ip \
    --global \
    --ip-version=IPV4 || true

kubectl apply -f ./namespace.yaml

kubectl apply -k ./

echo "Waiting for ingress to be created..."
while ! kubectl get ingress -n animal-farm animal-farm-ingress > /dev/null 2>&1; do
    echo "Waiting for ingress to be created..."
    sleep 5
done

echo "Waiting for ingress IP address..."
while [ -z "$INGRESS_IP" ]; do
    INGRESS_IP=$(kubectl get ingress -n animal-farm animal-farm-ingress -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null)
    if [ -z "$INGRESS_IP" ]; then
        echo "Still waiting for IP..."
        sleep 10
    fi
done

echo "Your application is accessible at: http://$INGRESS_IP"

kubectl get pods,svc,ingress -n animal-farm 