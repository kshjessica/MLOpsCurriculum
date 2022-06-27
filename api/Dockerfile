###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As build-dev

# Create app directory
WORKDIR /usr/src/app

# Set dependencies
COPY package*.json ./
RUN npm ci
COPY . .

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build-pro

WORKDIR /usr/src/app

COPY package*.json ./

# Access Nest CLI
COPY --from=build-dev /usr/src/app/node_modules ./node_modules
COPY . .

# Create production bundle
RUN npm run build

# Set env variables
ENV NODE_ENV production

# Remove existing node_modules dir
RUN npm ci --only=production && npm cache clean --force

###################
# PRODUCTION
###################

FROM node:18-alpine As production

# Copy code from build to production
COPY --from=build-pro /usr/src/app/node_modules ./node_modules
COPY --from=build-pro /usr/src/app/dist ./dist

# Start server 
CMD [ "node", "dist/main.js" ]