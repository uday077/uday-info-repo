# Use official Nginx image as base
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy website files
COPY index.html .
COPY styles.css .
COPY script.js .
COPY images/ ./images/
COPY sitemap.xml .
COPY robots.txt .

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Add labels for metadata
LABEL maintainer="Uday Patil <udaypatildevops@gmail.com>"
LABEL description="DevOps Engineer Portfolio Website"
LABEL version="1.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
