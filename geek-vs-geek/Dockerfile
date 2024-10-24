FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/geek-vs-geek-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "/app/app.jar"]