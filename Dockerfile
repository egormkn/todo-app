########################################
#             BUILD STAGE              #
########################################

# Initialize from NodeJS v14 (Debian)
FROM node:16 as build

# Set working directory
WORKDIR /app

# Change permissions for working directory
RUN chown -R node:node .

# Switch to non-root user
USER node

############ BUILD CLIENT ##############

# Extend from build image for client
FROM build as build-client

# Copy client manifest files
COPY --chown=node:node client/package*.json ./

# Install all dependencies and clean cache
RUN npm ci && npm cache clean --force

# Copy client files
COPY --chown=node:node client ./

# Build client
RUN npm run docs && npm run build:ssr

############ BUILD SERVER ##############

# Extend from build image for server
FROM build as build-server

# Copy server manifest files
COPY --chown=node:node server/package*.json ./

# Install all dependencies and clean cache
RUN npm ci && npm cache clean --force

# Copy server files
COPY --chown=node:node server ./

# Build server and prune dependencies
RUN npm run docs && npm run build

########################################
#           PRODUCTION STAGE           #
########################################

# Initialize from NodeJS v14 (Alpine)
FROM node:16-alpine as production

# Set working directory
WORKDIR /app

# Copy server manifest files
COPY --chown=node:node server/package*.json ./

# Install production dependencies and clean cache
RUN apk add --no-cache --virtual .gyp python make g++ \
 && npm ci --omit=dev && npm cache clean --force \
 && apk del .gyp

# Change permissions for working directory
RUN chown -R node:node .

# Switch to non-root user
USER node

# Copy client dist files from build-client image
COPY --chown=node:node --from=build-client /app/dist client/dist/

# Copy server dist files from build-server image
COPY --chown=node:node --from=build-server /app/dist server/dist/

# Copy client documentation from build-client image
COPY --chown=node:node --from=build-client /app/docs client/docs/

# Copy server documentation from build-server image
COPY --chown=node:node --from=build-server /app/docs server/docs/

# Copy server env file from build image
COPY --chown=node:node --from=build-server /app/.env.example ./

# Set a path to the client dist directory for SSR
ENV CLIENT="../client/"

# Set NODE_ENV from build arguments
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set HOST from build arguments
ARG HOST=localhost
ENV HOST=${HOST}

# Set PORT from build arguments
ARG PORT=3000
ENV PORT=${PORT}

# Expose port
EXPOSE ${PORT}

# Run main script
CMD ["node", "server/dist/main"]
