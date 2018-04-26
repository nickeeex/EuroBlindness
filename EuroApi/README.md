# Authorize with JWT (RS256)

This example shows how to authenticate a user using a JSON Web Token (JWT) which is signed using RS256.

### Using the command line

Restore the NuGet packages and run the application:

```bash
dotnet restore

dotnet run
```

### Using Docker

In order to run the example with docker you need to have **Docker** installed.

Execute in command line `sh exec.sh` to run the Docker in Linux or macOS, or `.\exec.ps1` to run the Docker in Windows.

## Calling the API

Go to `http://localhost:3010/api/public` in Postman (or your web browser) to access the ping API endpoint. To access the secure endpoint you will need to [obtain an access token](https://auth0.com/docs/tokens/access-token#how-to-get-an-access-token) and then pass the access token as a **Bearer** token in the **Authorization** header when calling the `http://localhost:3010/api/private` endpoint.

