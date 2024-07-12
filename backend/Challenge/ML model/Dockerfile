# Use the official Python image from the Docker Hub
FROM python:3.10.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the necessary files into the container at /app
COPY . /app



# Install any needed packages
RUN pip install --no-cache-dir numpy tensorflow==2.15.1 fastapi uvicorn pillow

# Expose port 5555 for the FastAPI app
EXPOSE 5555

# Run app.py when the container launches
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5555"]
