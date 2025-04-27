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

# Generate Prisma client
RUN cd apps/server && bun run db:generate

# Build server
RUN cd apps/server && bun run build

# Expose server port
EXPOSE 3000

# Set working directory to server
WORKDIR /app/apps/server

# Run server
CMD ["bun", "run", "start"]