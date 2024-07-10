FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/reward-0.0.1-SNAPSHOT.jar /app

EXPOSE 3011

CMD ["java", "-jar", "reward-0.0.1-SNAPSHOT.jar"]