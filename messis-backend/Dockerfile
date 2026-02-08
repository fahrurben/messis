# Use the official Python runtime image (using a slim version is recommended for smaller image size)
FROM python:3.11.9-slim

# Set environment variables
# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the requirements file and install dependencies
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the entire Django project into the container
COPY . .

# Run the application using manage.py (for development)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]