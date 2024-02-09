# Troubleshooting help

The purpose of this file is to assist in addressing common issues when setting up this project.

## Error #1

**Command executed**: `docker compose up`

```
Error response from daemon: driver failed programming external connectivity on endpoint server-db-1 (82800a0b5522b5243b87f4251d5cf932f963349770753ef5f8f84205e7ac302a): Bind for 0.0.0.0:5432 failed: port is already allocated
```

**Explanation**: This error means that you have another container within Docker that is using port 5432.

**Solution**: Re-build your container and assign it a different port number or delete the container that shares this port number.