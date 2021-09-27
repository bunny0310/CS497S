FROM mcr.microsoft.com/dotnet/sdk:5.0
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . ./
EXPOSE 5000
CMD ["dotnet", "watch", "run"];