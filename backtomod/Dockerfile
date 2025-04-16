FROM node:21-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp \
	python3 \
	make \
	g++ \
	bash \
	curl \
	vim \ 
	&& npm install \
	&& apk del .gyp

COPY . .

EXPOSE 3000

CMD ["/bin/sh", "-c", "if [ \"$MODE\" = \"development\" ]; then npm run dev; else npm run start; fi"]
