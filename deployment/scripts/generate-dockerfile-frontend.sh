set -e

# This script is inserting rows from env file in Dockerfile.
# Made for building frontend app with webpack with all env vars

DOCKERFILE_FRONTEND_DIR="deployment/dockerfiles/Dockerfile.frontend.common"
ROW_NUMBER=3

ERROR_MSG=""
test -n "$ENV_FRONTEND" || ERROR_MSG="ENV_FRONTEND not exists"
test -f "$DOCKERFILE_FRONTEND_DIR" || ERROR_MSG="$DOCKERFILE_FRONTEND_DIR not exists"

if [ "$ERROR_MSG" != "" ]; then
  echo "Fatal: $ERROR_MSG"
  exit 1
fi

cp "$ENV_FRONTEND"  .env.frontend

while IFS= read -r line; do
	sed -i "$ROW_NUMBER i ENV $line" $DOCKERFILE_FRONTEND_DIR
	((ROW_NUMBER=ROW_NUMBER+1))
done < .env.frontend

echo "########## Dockerfile for frontend done ##########"

# TODO debug
cat $DOCKERFILE_FRONTEND_DIR
