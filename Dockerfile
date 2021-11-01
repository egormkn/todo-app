########################################
#             BUILD STAGE              #
########################################

# Initialize from NodeJS v14
FROM node:14 as build

# Set working directory
WORKDIR /app

# Change permissions for working directory
RUN chown -R node:node .

# Switch to non-root user
USER node

# Copy client manifest files
COPY --chown=node:node client/package*.json client/

# Copy server manifest files
COPY --chown=node:node server/package*.json server/

# Install all dependencies and clean cache
RUN npm ci --prefix=client && \
    npm ci --prefix=server && \
    npm cache clean --force

# Change working directory to client
WORKDIR /app/client/

# Copy client files
COPY --chown=node:node client ./

# Build client
RUN npm run build:ssr

# Change working directory to server
WORKDIR /app/server/

# Copy server files
COPY --chown=node:node server ./

# Build server and prune dependencies
RUN npm run build && npm prune --production

########################################
#           PRODUCTION STAGE           #
########################################

# Initialize from NodeJS v14 (Alpine Linux)
FROM node:14-alpine as production

# Set working directory
WORKDIR /app

# Change permissions for working directory
RUN chown -R node:node .

# Switch to non-root user
USER node

# Copy client dist files from build image
COPY --chown=node:node --from=build /app/client/dist client/

# Copy server dist files from build image
COPY --chown=node:node --from=build /app/server/dist server/

# Copy server node_modules from build image
COPY --chown=node:node --from=build /app/server/node_modules node_modules/

# Copy server env file from build image
COPY --chown=node:node --from=build /app/server/.env.example ./

# Set a path to the client dist directory for SSR
ENV CLIENT_DIST="client/app"

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
CMD ["node", "server/main"]
