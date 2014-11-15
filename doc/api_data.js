define({ api: [
  {
    "type": "delete",
    "url": "/v1/user/:id",
    "title": "Delete User information",
    "name": "DeleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>User&#39;s unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "success",
            "optional": false,
            "description": "<p>When the request is successful.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n   {\n     \"success\": true\n   }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/user.js"
  },
  {
    "type": "get",
    "url": "/v1/user/:id",
    "title": "Request User information",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>User&#39;s unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "success",
            "optional": false,
            "description": "<p>When the request is successful.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "user",
            "optional": false,
            "description": "<p>The user object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "user.id",
            "optional": false,
            "description": "<p>The user&#39;s unique id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "user.email",
            "optional": false,
            "description": "<p>The user&#39;s email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "user.role",
            "optional": false,
            "description": "<p>The user&#39;s role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "user.createdAt",
            "optional": false,
            "description": "<p>The date the user was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "user.updatedAt",
            "optional": false,
            "description": "<p>The date the user was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n   {\n     \"success\": true,\n     \"user\": {\n       \"id\": \"the-unique-id\",\n       \"email\": \"example@email.com\",\n       \"role\": \"user\",\n       \"createdAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),\n       \"updatedAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)\n     }\n   }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/user.js"
  },
  {
    "type": "get",
    "url": "/v1/user?page=0&perPage=10",
    "title": "Request list of users",
    "name": "GetUsers",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  GET /v1/user?page=2&perPage=25\n",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "success",
            "optional": false,
            "description": "<p>When the request is successful.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "users",
            "optional": false,
            "description": "<p>The user object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "users.id",
            "optional": false,
            "description": "<p>The user&#39;s unique id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "users.email",
            "optional": false,
            "description": "<p>The user&#39;s email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "users.role",
            "optional": false,
            "description": "<p>The user&#39;s role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "users.createdAt",
            "optional": false,
            "description": "<p>The date the user was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "users.updatedAt",
            "optional": false,
            "description": "<p>The date the user was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n   {\n     \"success\": true,\n     \"users\": [{\n       \"id\": \"the-unique-id\",\n       \"email\": \"example@email.com\",\n       \"role\": \"user\",\n       \"createdAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),\n       \"updatedAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)\n     }]\n   }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/user.js"
  },
  {
    "type": "post",
    "url": "/v1/user",
    "title": "Create a new User.",
    "name": "PostUser",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  POST /v1/user\n  {\n    email: \"newemail@email.com\",\n    role: \"user\",\n    password: \"newPassword\"\n  }\n",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>User&#39;s unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "success",
            "optional": false,
            "description": "<p>When the request is successful.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "user",
            "optional": false,
            "description": "<p>The user object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "user.id",
            "optional": false,
            "description": "<p>The user&#39;s unique id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "user.email",
            "optional": false,
            "description": "<p>The user&#39;s email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "user.role",
            "optional": false,
            "description": "<p>The user&#39;s role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "user.createdAt",
            "optional": false,
            "description": "<p>The date the user was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "user.updatedAt",
            "optional": false,
            "description": "<p>The date the user was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n  HTTP/1.1 200 OK\n  {\n    \"success\": true,\n    \"user\": {\n      \"id\": \"the-unique-id\",\n      \"email\": \"example@email.com\",\n      \"role\": \"user\",\n      \"createdAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),\n      \"updatedAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)\n    }\n  }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/user.js"
  },
  {
    "type": "put",
    "url": "/v1/user/:id",
    "title": "Update User information.",
    "name": "PutUser",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  PUT /v1/user/the-users-unique-id\n  {\n    email: \"newemail@email.com\",\n    role: \"user\",\n    password: \"newPassword\"\n  }\n",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>User&#39;s unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "field": "success",
            "optional": false,
            "description": "<p>When the request is successful.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "user",
            "optional": false,
            "description": "<p>The user object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "user.id",
            "optional": false,
            "description": "<p>The user&#39;s unique id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "user.email",
            "optional": false,
            "description": "<p>The user&#39;s email.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "user.role",
            "optional": false,
            "description": "<p>The user&#39;s role.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "user.createdAt",
            "optional": false,
            "description": "<p>The date the user was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "user.updatedAt",
            "optional": false,
            "description": "<p>The date the user was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n  HTTP/1.1 200 OK\n  {\n    \"success\": true,\n    \"user\": {\n      \"id\": \"the-unique-id\",\n      \"email\": \"example@email.com\",\n      \"role\": \"user\",\n      \"createdAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),\n      \"updatedAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)\n    }\n  }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/user.js"
  }
] });