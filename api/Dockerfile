###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:alpine As build-dev

# Create app directory
WORKDIR /usr/src/app

# Set dependencies
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .

# Set user
RUN npm ci

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build-pro

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

# Access Nest CLI
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

# Create production bundle
RUN npm run build

# Set env variables
ENV NODE_ENV production

# Remove existing node_modules dir
RUN npm ci --only=production && npm cache clean --force
USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

# Copy code from build to production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start server 
CMD [ "node", "dist/main.js" ]