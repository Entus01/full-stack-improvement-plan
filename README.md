# 3-Month Full Stack Improvement Plan
Stack: React + JS + Node.js + Express.js + MongoDB
Goal: Build an Enterprise-Ready Invoice Management System


## Month 1- Fundamentals and Clean Arquitecture

### 01. javascript-data-transformer
- Estimated Time:
    8-12 hours
- Description:
    Create a utility library that receives arrays of objects and allows filtering, sorting, grouping, searching and pagination.
- Skills:
    Array methods -> functions used to process collections of data.
    Immutability -> practice modifying data without altering the original source.
    Pure functions -> Functions that always produce the same output from the same input.
    Functional programming -> 
    Data transformation ->
    Clean code ->
    Documentation ->

### 02. form-validator
- Description:
    Build a reusable validation engine capable of validating forms through configurable rules.
- Skills:
    Regular expressions
    Validation patterns
    Error handling
    Reusable functions
    Separation of concerns

### 03. local-sorage-manager
- Estimated time:

- Description:
    Create an abtraction layer over browser localStorage to handle CRUD operations and data seralization.
- Skills
    Browser APIs
    JSON serialization
    Error handling

### 04. react-component library
- Estimated time:

- Description:
    Develop a colletion of reusable UI components.
- Skills
    React fundamentals
    Props
    Component composition
    Reusability

### 5. custom-hooks-collection
- Estimated time:

- Description:
    Build several reusable custom hooks for comon business needs.
- Skills
    useState
    useEffect
    Custom Hooks
    State isolation
    Reusability

### 06. react-form-engine
- Estimated time:

- Description:
    Develop a dynamic form generator that render fiolds from configuration objects.
- Skills
    Dynamic rendering
    Controlled inputs
    Form management
    Validation integration
    Component architecture

### 07. authentication-ui
- Estimated time:

- Description:
    Create Login, Register, Forgot Password and Reset Password interfaces.
- Skills
    Form handling
    Routing
    Component design
    Authentication workflows
    UX patterns

### 08. expense-tracker-client
- Estimated time:

- Description:
    Build a complete frontend for personal expense tracking.
- Skills
    CRUD UI
    Filtering
    Search
    Charts
    State management
    Pagination


## Month 2 - Backend Engineering

### 09. express-server-foundation
- Estimated time:

- Description:
    Create a backend foundation  with modular architecture and environment configuration.
- Skills
    Express.js
    Enviroment variables
    Middleware
    Routing
    Folder organization
    Configuration management

### 10. api-error-handler
- Estimated time:

- Description:
    Develop a centralized error handling system.
- Skills
    Error management
    Middleware
    Loggingn
    API standards
    HTTP responses

### 11. jwt-auth-service
- Estimated time:

- Description:
    Create an authorization service using JWT.
- Skills
    Authentication
    Authorization
    Token management
    Passweord hashing
    Security principles

### 12. role-permission-system
- Estimated time:

- Description:
    Develop a permissin engine supporting multiple user roles.
- Skills
    RBAC
    Authorization
    Middleware
    Security Architecture
    Database relationships

### 13. mongodb-schema-design
- Estimated time:

- Description:
    Create multiple related collections modeling a complete business domain.
- Skills
    Database design
    Mongoose
    Relationships
    Validation
    Indexing

### 14. file-upload-service
- Estimated time:

- Description:
    Build a service capable of uploading and managing documents.
- Skills
    File handling
    Storage architecture
    Security validation
    API design

### 15. audit-log-system
- Estimated time:

- Description:
    Register every important action performed by users.
- Skills
    Event tracking
    Database logging
    User activity history
    Compliance concepts

### 16. notification-service
- Estimated time:

- Description:
    Create a backend notification system.
- Skills
    Event-driven design
    Service architecture
    Background processes
    Message management



## Month 3 - Enterprise Application Development

### 17. customer-management-system
- Estimated time:

- Description:
    Build a complete customer administration module.
- Skills
    Full CRUD
    Database relations
    Search
    Filters
    Pagination
    Business rules

### 18. product-catalog-system
- Estimated time:

- Description:
    Create a complete product management platform.
- Skills
    Inventory concepts
    CRUD operations
    Validation
    Search optimization
    Categorization

### 19. invoice-builder-engine
- Estimated time:

- Description:
    Develop an engine capable of generating invoices from products and customers.
- Skills
    Business logic
    Calculations
    Data relationship
    Architecture design

### 20. invoice-status-manager
- Estimated time:

- Description:
    Implement invoice lifecycle management.
- Skills
    Draft
    Pending
    Sent
    Partially Paid
    Paid
    Cancelled

### 21. invoice-search-engine
- Estimated time:

- Description:
    Create an advanced invoice filtering system.
- Skills
    Query building
    Dynamic filters
    Pagination
    Database optimization
- Filters
    Customer
    Invoice Number
    Data RANGE
    Product
    Status
    Amount
    Creator

### 22. payment-management-system (stand by, client want it manuallly handle)
- Estimated time:

- Description:
    Develop a payment module linked to invoices.
- Skills
    Financial calculations
    Transaction management
    Validation
    Database consistency
- Features
    Partial payments
    Full payments
    Payment history
    Remaining balances

### 23. invoice-permission-system
- Estimated time:

- Description:
    Implement invoice access control according to user role.
- Skills
    RCAB
    Resource ownership
    Security
    Access poicies
- Roles
    Superadmin*
    Administrator
    Accointant
    Manager
    Sales Rep
    Viewer

### 24. invoice-history-tracker
- Estimated time:

- Description:
    Track every modification made to an invoice.
- Skills
    Audit trails
    Data versioning
    Change tracking
- Record Examples
    Created
    Edited
    Sent
    Paid
    Deleted
    Restored

### 25. invoice-dashboard
- Estimated time:

- Description:
    Develop a business dashboard for invoice analytics.
- Skills
    Aggregation queries
    Reporting
    Dashboard design
    Data visualization
- Metrics
    Total Revenue
    Outstanding Revenue
    Paid Revenue
    Overdue Revenue
    Top Customers
    Most Sold Products

### 26. invoice-management-system
- Estimated time:

- Description:
    Build the complete application by integrationg all previous projects into an unified platform.
- Skills
    Software architecture
    Feature integration
    Security
    Scalability
    Maintainability
    Testing
    Documentation
- Minimum Features
    #### User Management:
        Register
        Login
        Logout
        Role Management
    #### Customer Management:
        Create
        Edit
        Delete
        Search
    #### Product Management:
        Create
        Edit
        Delete
        Search
    #### Invoice Management
        Create
        Edit
        Delete
        Duplicate
        Send
        Archive
    #### Invoice Status
        Draft
        Pending
        Sent
        Overdue
        Partially Paid
        Paid
        Cancelled
    #### Payment Management
        Register Payment
        Partial Payment
        Full Payment
        Payment History
    #### Search and Filters
        Customer
        Product
        Date
        Amount
    #### Security
        Authentication
        Authorization
        Resource Ownership
        Audit Log
    #### Reporting
        Revenue Reports
        Customer Reports
        Product Reports
        Invoice Reports



Prompt

You are a full-stack web development teacher.

I am going to create a folder on my personal computer, where each library inside this folder will contain a task or tool for everyday use or a good practice to improve my full-stack web development skills.

The technologies in which these tasks will be developed are React, Vite, Node.js, Express.js, NPM, MongoDB, and a database (I have not yet decided whether it should be SQL or Python; help me choose which would be better).

The development will be assisted by AI through a prompting engineering approach.

I want you to list exercises, ordering them from least to greatest difficulty, where I can learn and/or improve the best practices of full-stack web development.

I do not want information unrelated to the exercises. Each exercise must include a brief description of what should be developed, the ideal development time in hours, the skills expected to be used, as well as an explanation of those skills. No exercise should include information that provides the solution. The name of each exercise must follow international project-directory naming conventions, that is, BEM. The development of all tasks must take place over a period of 3 months.

At the end of the exercises, a web application will be developed to manage a company's invoicing. Among the tasks in this program will be creating invoices, editing them, archiving them, sending them, editing them, downloading them, deleting them; it must also manage the payment status of each invoice (partially paid, fully paid, overdue, cancelled, created, sent, ETC.); be able to list and/or filter invoices by client and date, sort by invoice number, download one or multiple invoices; invoices must be viewable as PDFs when they are sent or downloaded, and a preview must also show what the user will see when they receive it by email or download it. Likewise, it must control user permissions for manipulating and viewing invoices, with their respective limitations. Finally, there must be database control and relationships between invoices, the users who create them, and the clients who own their respective invoices. I do not want information other than what was requested. Make sure to create a README.md file and an AGENT.md file based on the previously stated request.