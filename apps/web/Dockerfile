FROM oven/bun:latest

WORKDIR /app

# Copy package.json and lock files
COPY package.json bun.lock ./
COPY apps/server/package.json ./apps/server/
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build web application
RUN cd apps/web && bun run build

# Expose Next.js port
EXPOSE 3001

# Set working directory to web
WORKDIR /app/apps/web

# Run web application
CMD ["bun", "run", "start"]