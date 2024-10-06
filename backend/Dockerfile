# Utilise l'image de Node.js comme image de base
FROM node:14

# Définit le répertoire de travail
WORKDIR /app

# Copie le package.json et le package-lock.json (s'ils existent) du répertoire parent
COPY ./backend/package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers de l'application dans le conteneur
COPY ./backend .

# Expose le port que votre application utilise
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
