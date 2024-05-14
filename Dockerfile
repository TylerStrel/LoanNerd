# Use the official Nginx image from Docker Hub
FROM nginx:stable-alpine

# Copy the static content of your site into the default Nginx serve directory
COPY .. /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
