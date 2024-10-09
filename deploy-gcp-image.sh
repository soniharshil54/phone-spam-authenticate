#!/bin/bash

# Variables
PROJECT_ID="gotham-433513"
LOCATION="us-central1" 
REPOSITORY_NAME="phone-spam-api-repo"
SERVICE_NAME="phone-spam-api-service-prod"
TAG="latest"

COMMIT_HASH=$(git rev-parse --short=10 HEAD)

DATE_TAG=$(date +%d%m%Y)

VERSION_TAG="${DATE_TAG}-${COMMIT_HASH}"
echo ${VERSION_TAG}

echo "Authenticating with Google Cloud..."
gcloud auth configure-docker "${LOCATION}-docker.pkg.dev" || { echo "Authentication failed"; exit 1; }

echo "Building the Docker image..."
docker-compose -f docker-compose.build.yml build || { echo "Docker build failed"; exit 1; }

echo "Tagging the image for Google Artifact Registry..."
docker tag ${SERVICE_NAME}:latest ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY_NAME}/${SERVICE_NAME}:latest || { echo "Tagging 'latest' failed"; exit 1; }
docker tag ${SERVICE_NAME}:latest ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY_NAME}/${SERVICE_NAME}:${VERSION_TAG} || { echo "Tagging with date and commit hash failed"; exit 1; }

echo "Pushing the image with 'latest' tag to Google Artifact Registry..."
docker push ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY_NAME}/${SERVICE_NAME}:latest || { echo "Docker push 'latest' failed"; exit 1; }

echo "Pushing the image with date and commit hash tag to Google Artifact Registry..."
docker push ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY_NAME}/${SERVICE_NAME}:${VERSION_TAG} || { echo "Docker push date and commit hash failed"; exit 1; }

# Confirm success
echo "Images pushed successfully to Artifact Registry:"
echo "- ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY_NAME}/${SERVICE_NAME}:latest"
echo "- ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY_NAME}/${SERVICE_NAME}:${VERSION_TAG}"
