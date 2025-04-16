FROM node:21-alpine3.18

WORKDIR /app 

# Default mode == production
ARG MODE=production

# Puts the env mode in the container env to use it inside (in start.sh for instance)
ENV MODE=$MODE

COPY package*.json ./

COPY . .

RUN apk update && apk add --no-cache \
bash \
curl \
vim \
coreutils \
&& npm install

# Transpilation of TypeScript + Tailwind via scripts (build) added in package.json
RUN npm run build

RUN chmod +x config/start.sh

CMD ["bash", "config/start.sh"]