# Dockerfile

FROM python:3.11-slim-bookworm

# Install Node.js and dependencies
RUN apt-get update && \
    apt-get install -y curl gnupg build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install ChromaDB
RUN pip install --no-cache-dir chromadb

# Set working directory
WORKDIR /app

# Copy and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy app code
COPY . .

# Create ChromaDB data folder
RUN mkdir -p ./my_chroma_data

# Expose the necessary ports
EXPOSE 3000
EXPOSE 8000

# Start Chroma and Express together
CMD ["bash", "-c", "chroma run --host 0.0.0.0 --port 8000 --path ./my_chroma_data & sleep 5 && node index.js"]
