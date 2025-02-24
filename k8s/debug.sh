#!/bin/bash

echo "Checking pods..."
kubectl get pods -n animal-farm
kubectl describe pods -l app=backend -n animal-farm

echo "Checking services..."
kubectl get svc -n animal-farm
kubectl describe svc backend -n animal-farm

echo "Checking ingress..."
kubectl get ingress -n animal-farm
kubectl describe ingress animal-farm-ingress -n animal-farm

echo "Checking backend logs..."
kubectl logs -l app=backend -n animal-farm

echo "Checking endpoints..."
kubectl get endpoints -n animal-farm 