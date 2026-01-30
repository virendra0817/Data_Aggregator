# 1️⃣ Use Node base image
FROM node:18-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files first (for caching)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install --production

# 5️⃣ Copy rest of the project
COPY . .

# 6️⃣ Expose port (same as server)
EXPOSE 3000

# 7️⃣ Start the app
CMD ["npm", "start"]
