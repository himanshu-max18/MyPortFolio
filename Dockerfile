# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy csproj and restore
COPY MyPortFolio.Server/*.csproj ./MyPortFolio.Server/
RUN dotnet restore ./MyPortFolio.Server/MyPortFolio.Server.csproj

# Copy everything and build
COPY MyPortFolio.Server/. ./MyPortFolio.Server/
WORKDIR /app/MyPortFolio.Server
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Render uses PORT env variable
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "MyPortFolio.Server.dll"]
