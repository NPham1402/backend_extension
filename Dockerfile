# Use the official PostgreSQL image as the base
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=140201
ENV POSTGRES_DB=mydatabase

# Copy initialization scripts into the container
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432
