###############################
#           Client            #
###############################

# Initialize from NodeJS v14
FROM node:14 as build-client

# Set working directory
WORKDIR /app/client

# Change permissions for working directory
RUN chown -R node:node .

# Switch to non-privileged user
USER node

# Copy app manifest files
COPY client/package*.json ./

# Install all dependencies
RUN npm ci

# Copy all files
COPY client ./

# Build project
RUN npm run build:ssr

###############################
#           Server            #
###############################

# Initialize from NodeJS v14
FROM node:14 as build-server

# Set working directory
WORKDIR /app/server

# Change permissions for working directory
RUN chown -R node:node .

# Switch to non-privileged user
USER node

# Copy app manifest files
COPY server/package*.json ./

# Install all dependencies
RUN npm ci

# Copy all files
COPY server ./

# Build project
RUN npm run build

###############################
#         Production          #
###############################

# Initialize from NodeJS v14 (Alpine Linux)
FROM node:14-alpine as production

# Set working directory
WORKDIR /app

# Change permissions for working directory
RUN chown -R node:node .

# Switch to non-privileged user
USER node

# Copy app manifest files
COPY server/package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy dist files from client image
COPY --from=build-client /app/client/dist client/

# Copy dist files from server image
COPY --from=build-server /app/server/dist server/

# Copy env file from server image
COPY --from=build-server /app/server/.env.example .

# Set a path for client dist directory for SSR
ENV CLIENT_DIST="client/words"

# Set NODE_ENV from build arguments
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set HOST from build arguments
ARG HOST="localhost"
ENV HOST=${HOST}

# Set PORT from build arguments
ARG PORT=3000
ENV PORT=${PORT}

# Expose port
EXPOSE ${PORT}

# Run main script
CMD ["node", "server/main"]
