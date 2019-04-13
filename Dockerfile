################## Client ####################
FROM node:carbon AS client-builder
WORKDIR /app
COPY . .

# Fetch client dependencies.
#RUN npm install --only-production
RUN npm install

# Buld client dist
RUN npm run build
RUN pwd && ls -al

################## Combine in release ####################
#FROM node:carbon AS release
#
#WORKDIR /app
#COPY --from=client-builder /app/.nuxt ./.nuxt
#COPY --from=client-builder /app/*.json ./
#COPY --from=client-builder /app/nuxt.config.js ./nuxt.config.js
#
## production dependency
#RUN npm install --only=production
#
## check files
#RUN pwd && ls -al

EXPOSE 3000

CMD ["npm", "run", "start"]
