## Modifications / Key Features

1. **Swagger Documentation**
   - API documentation is available via Swagger: [Swagger UI](http://localhost:3000/api)
   - Two approaches are supported:
     1. Define the Swagger spec upfront for cross-team development based on a clear contract.
     2. Define API definitions directly within controllers without a separate specification.
   - Ensures proper API contracts, type validation, and database type consistency.
   - Admin-specific APIs can be prefixed with `admin`, while public-facing APIs use only the resource name.

2. **Module Separation**
   - Application is organized into distinct modules such as `Product` and `Users` for better maintainability and scalability.
   - Database access should follow a structured flow: `Controller -> Service -> DAO`, with occasional use of `Controller -> Manager -> Service -> DAO`.
   - ORM queries involving complex relationships (e.g., many-to-one) can impact performance; native queries are preferred for large data fetches.
   - Indexing should use meaningful names instead of UUID-style names for better readability.
   - Tables should include `created_ts`, `updated_ts`, `created_by`, `updated_by` instead of `created_date`/`updated_date`.
   - Module naming convention: singular is preferred for consistency, though plural can be used where appropriate.

3. **Logging**
   - Use centralized logging frameworks to store logs, e.g., AWS CloudWatch or ELK stack, with rolling patterns for scalability.

4. **Metrics**
   - Implement metrics to track API latency, performance, and any contention in methods.

5. **Health Check API**
   - Centralized endpoint to monitor the status of all services and external integrations.
   - Checks connectivity to databases, cache, external APIs, and other dependencies.
   - Example endpoint: `GET /health`
   - Supports Kubernetes liveness/readiness probes or ECS health checks to automatically restart failing pods.

6. **TestContainers for Testing**
   - Integration tests run in isolated Docker containers, ensuring reliable and reproducible results.

7. **Global Exception Handling**
   - Centralized exception handling ensures consistent error responses across all APIs.

8. **Authentication and Authorization**
   - JWT-based authentication with role-based guards.
   - Supports admin vs user access control.

9. **Testing Strategy**
   - Combines unit tests, mock tests, and integration tests using TestContainers for comprehensive coverage.
   - Seed data can be added via migration scripts for tests.

10. **Caching**
    - Search APIs or frequently accessed endpoints can be cached using Redis or Hazelcast to improve performance.
    - Caching can be applied wherever required based on usage patterns.
