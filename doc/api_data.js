define({ api: [
  {
    "type": "post",
    "url": "/v1/auth/login",
    "title": "Log a user in",
    "name": "Login",
    "group": "Auth",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  POST /v1/auth/login\n  {\n    \"email\": \"email@email.com\",\n    \"password\": \"password\"\n  }\n",
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
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n  HTTP/1.1 200 OK\n  {\n    \"success\": false,\n    \"error\": \"Incorrect Password\"\n  }\n  HTTP/1.1 200 OK\n  {\n    \"success\": false,\n    \"error\": \"Max Attempts\"\n  }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/auth.js"
  },
  {
    "type": "post",
    "url": "/v1/auth/logout",
    "title": "Log a user out",
    "name": "Logout",
    "group": "Auth",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  POST /v1/auth/logout\n",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n  HTTP/1.1 200 OK\n  {\n    \"success\": true\n  }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/auth.js"
  },
  {
    "type": "post",
    "url": "/v1/auth/request-reset",
    "title": "Request a password reset",
    "name": "RequestReset",
    "group": "Auth",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  POST /v1/auth/request-reset\n  {\n    \"email\": \"email@email.com\"\n  }\n",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n  HTTP/1.1 200 OK\n  {\n    \"success\": true\n  }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/auth.js"
  },
  {
    "type": "post",
    "url": "/v1/auth/reset-password",
    "title": "Reset a user's password",
    "name": "ResetPassword",
    "group": "Auth",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  POST /v1/auth/request-reset\n  {\n    \"email\": \"email@email.com\",\n    \"token\": \"the-token-given-from-the-email\",\n    \"password\": \"the-new-password\"\n  }\n",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n  HTTP/1.1 200 OK\n  {\n    \"success\": true\n  }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/auth.js"
  },
  {
    "type": "get",
    "url": "/v1/auth/roles",
    "title": "Get the user role information",
    "name": "Roles",
    "group": "Auth",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  GET /v1/auth/roles\n",
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
            "type": "String[]",
            "field": "roles",
            "optional": false,
            "description": "<p>The possible user roles</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "accessLevels",
            "optional": false,
            "description": "<p>The access levels. Each key is an access  level, and the values are arrays of user roles.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n  HTTP/1.1 200 OK\n  {\n    \"success\": true,\n    \"roles\": [\"user\", \"admin\"],\n    \"accessLevels\": {\n      \"user\": [\"user\", \"admin\"],\n      \"admin\": [\"admin\"]\n    }\n  }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/auth.js"
  },
  {
    "type": "delete",
    "url": "/v1/question/:id",
    "title": "Delete Question information",
    "name": "DeleteQuestion",
    "group": "Question",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>Question&#39;s unique ID.</p>"
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
    "filename": "routes/v1/question.js"
  },
  {
    "type": "get",
    "url": "/v1/question/:id",
    "title": "Request Question information",
    "name": "GetQuestion",
    "group": "Question",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "<p>The question&#39;s unique id</p>"
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
            "field": "question",
            "optional": false,
            "description": "<p>The question object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question._id",
            "optional": false,
            "description": "<p>The question&#39;s unique id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.label",
            "optional": false,
            "description": "<p>The internally used question label</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.question",
            "optional": false,
            "description": "<p>The question to be asked to the  student</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.type",
            "optional": false,
            "description": "<p>One of the question types referenced at  &quot;Get the question types&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "question.createdAt",
            "optional": false,
            "description": "<p>The date the question was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "question.updatedAt",
            "optional": false,
            "description": "<p>the date the question was updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "question.choices",
            "optional": false,
            "description": "<p>The choices for the question if  applicable</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.choices.label",
            "optional": false,
            "description": "<p>The label for the choice, as  displayed to the student</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.choices.key",
            "optional": false,
            "description": "<p>The value of the choice. If an  &quot;other&quot; option is specified, this should be &#39;other&#39;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n   {\n     \"success\": true,\n     \"question\": {\n       \"id\": \"the-unique-id\",\n       \"label\": \"The question label\",\n       \"question\": \"What is the question?\",\n       \"type\": \"multipleChoice\",\n       \"choices\": [\n         {\n           \"label\": \"There is no question\",\n           \"key\": \"noQuestion\"\n         },\n         {\n           \"label\": \"Other\",\n           \"key\": \"other\"\n         }\n       ],\n       \"createdAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),\n       \"updatedAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)\n     }\n   }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/question.js"
  },
  {
    "type": "post",
    "url": "/v1/question",
    "title": "Create Question",
    "name": "PostQuestion",
    "group": "Question",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  POST /v1/question\n  {\n    \"label\": \"New Label\",\n    \"question\": \"New question?\",\n    \"type\": \"multpleChoice\",\n    \"choices\": [{\n      \"label\": \"Answer Label\",\n      \"key\": \"answerKey\"\n    }]\n  }\n",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "<p>The question&#39;s unique id</p>"
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
            "field": "question",
            "optional": false,
            "description": "<p>The question object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question._id",
            "optional": false,
            "description": "<p>The question&#39;s unique id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.label",
            "optional": false,
            "description": "<p>The internally used question label</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.question",
            "optional": false,
            "description": "<p>The question to be asked to the  student</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.type",
            "optional": false,
            "description": "<p>One of the question types referenced at  &quot;Get the question types&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "question.createdAt",
            "optional": false,
            "description": "<p>The date the question was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "question.updatedAt",
            "optional": false,
            "description": "<p>the date the question was updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "question.choices",
            "optional": false,
            "description": "<p>The choices for the question if  applicable</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.choices.label",
            "optional": false,
            "description": "<p>The label for the choice, as  displayed to the student</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.choices.key",
            "optional": false,
            "description": "<p>The value of the choice. If an  &quot;other&quot; option is specified, this should be &#39;other&#39;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n   {\n     \"success\": true,\n     \"question\": {\n       \"id\": \"the-unique-id\",\n       \"label\": \"The question label\",\n       \"question\": \"What is the question?\",\n       \"type\": \"multipleChoice\",\n       \"choices\": [\n         {\n           \"label\": \"There is no question\",\n           \"key\": \"noQuestion\"\n         },\n         {\n           \"label\": \"Other\",\n           \"key\": \"other\"\n         }\n       ],\n       \"createdAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),\n       \"updatedAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)\n     }\n   }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/question.js"
  },
  {
    "type": "put",
    "url": "/v1/question/:id",
    "title": "Update Question information",
    "name": "PutQuestion",
    "group": "Question",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  PUT /v1/question/the-questions-id\n  {\n    \"label\": \"New Label\",\n    \"question\": \"New question?\",\n    \"type\": \"multpleChoice\",\n    \"choices\": [{\n      \"label\": \"Answer Label\",\n      \"key\": \"answerKey\"\n    }]\n  }\n",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "<p>The question&#39;s unique id</p>"
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
            "field": "question",
            "optional": false,
            "description": "<p>The question object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question._id",
            "optional": false,
            "description": "<p>The question&#39;s unique id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.label",
            "optional": false,
            "description": "<p>The internally used question label</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.question",
            "optional": false,
            "description": "<p>The question to be asked to the  student</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.type",
            "optional": false,
            "description": "<p>One of the question types referenced at  &quot;Get the question types&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "question.createdAt",
            "optional": false,
            "description": "<p>The date the question was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "question.updatedAt",
            "optional": false,
            "description": "<p>the date the question was updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "question.choices",
            "optional": false,
            "description": "<p>The choices for the question if  applicable</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.choices.label",
            "optional": false,
            "description": "<p>The label for the choice, as  displayed to the student</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "question.choices.key",
            "optional": false,
            "description": "<p>The value of the choice. If an  &quot;other&quot; option is specified, this should be &#39;other&#39;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n   {\n     \"success\": true,\n     \"question\": {\n       \"id\": \"the-unique-id\",\n       \"label\": \"The question label\",\n       \"question\": \"What is the question?\",\n       \"type\": \"multipleChoice\",\n       \"choices\": [\n         {\n           \"label\": \"There is no question\",\n           \"key\": \"noQuestion\"\n         },\n         {\n           \"label\": \"Other\",\n           \"key\": \"other\"\n         }\n       ],\n       \"createdAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),\n       \"updatedAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)\n     }\n   }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/question.js"
  },
  {
    "type": "get",
    "url": "/v1/question/types",
    "title": "Get the question types",
    "name": "QuestionTypes",
    "group": "Question",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  GET /v1/question/types\n",
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
            "type": "Object",
            "field": "types",
            "optional": false,
            "description": "<p>The possible question types</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n  HTTP/1.1 200 OK\n  {\n    \"success\": true,\n    \"types\": {\n      \"multipleChoice\": \"Multiple Choice\",\n      \"multipleCorrect\": \"Muliple Correct\",\n      \"trueFalse\": \"True/False\",\n      \"shortAnswer\": \"Short Answer\",\n      \"essay\": \"Essay\",\n      \"ordering\": \"Ordering\"\n    }\n  }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/question.js"
  },
  {
    "type": "get",
    "url": "/v1/question",
    "title": "Get all of the questions",
    "name": "Questions",
    "group": "Question",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  GET /v1/question\n",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "id",
            "optional": false,
            "description": "<p>The question&#39;s unique id</p>"
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
            "field": "questions",
            "optional": false,
            "description": "<p>The questions array.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "questions._id",
            "optional": false,
            "description": "<p>The question&#39;s unique id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "questions.label",
            "optional": false,
            "description": "<p>The internally used question label</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "questions.question",
            "optional": false,
            "description": "<p>The question to be asked to the  student</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "questions.type",
            "optional": false,
            "description": "<p>One of the question types referenced at  &quot;Get the question types&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "questions.createdAt",
            "optional": false,
            "description": "<p>The date the question was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "questions.updatedAt",
            "optional": false,
            "description": "<p>the date the question was updated</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "questions.choices",
            "optional": false,
            "description": "<p>The choices for the question if  applicable</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "questions.choices.label",
            "optional": false,
            "description": "<p>The label for the choice, as  displayed to the student</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "questions.choices.key",
            "optional": false,
            "description": "<p>The value of the choice. If an  &quot;other&quot; option is specified, this should be &#39;other&#39;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n   {\n     \"success\": true,\n     \"questions\": [{\n       \"id\": \"the-unique-id\",\n       \"label\": \"The question label\",\n       \"question\": \"What is the question?\",\n       \"type\": \"multipleChoice\",\n       \"choices\": [\n         {\n           \"label\": \"There is no question\",\n           \"key\": \"noQuestion\"\n         },\n         {\n           \"label\": \"Other\",\n           \"key\": \"other\"\n         }\n       ],\n       \"createdAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),\n       \"updatedAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)\n     }]\n   }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/question.js"
  },
  {
    "type": "delete",
    "url": "/v1/student/:uvid",
    "title": "Delete at student",
    "name": "DeleteStudent",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>The Student&#39;s UVID</p>"
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
    "filename": "routes/v1/student.js"
  },
  {
    "type": "get",
    "url": "/v1/student/current",
    "title": "Get current logged in student",
    "name": "GetCurrentStudent",
    "group": "Student",
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
            "field": "student",
            "optional": false,
            "description": "<p>The student object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "student.id",
            "optional": false,
            "description": "<p>The student&#39;s unique id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "student.uvid",
            "optional": false,
            "description": "<p>The student&#39;s UVID</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "student.createdAt",
            "optional": false,
            "description": "<p>The date the student was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "student.updatedAt",
            "optional": false,
            "description": "<p>The date the student was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n   {\n     \"success\": true,\n     \"student\": {\n       \"id\": \"the-unique-id\",\n       \"uvid\": \"10283774\",\n       \"createdAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),\n       \"updatedAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)\n     }\n   }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/student.js"
  },
  {
    "type": "get",
    "url": "/v1/student/",
    "title": "Get list of all students",
    "name": "GetStudents",
    "group": "Student",
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
            "field": "students",
            "optional": false,
            "description": "<p>The students array.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "students.id",
            "optional": false,
            "description": "<p>The student&#39;s unique id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "students.uvid",
            "optional": false,
            "description": "<p>The student&#39;s UVID</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "students.createdAt",
            "optional": false,
            "description": "<p>The date the student was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "students.updatedAt",
            "optional": false,
            "description": "<p>The date the students was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n   {\n     \"success\": true,\n     \"students\": [{\n       \"id\": \"the-unique-id\",\n       \"uvid\": \"10283774\",\n       \"createdAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),\n       \"updatedAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)\n     }]\n   }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/student.js"
  },
  {
    "type": "post",
    "url": "/v1/student/answer/:qid",
    "title": "Answer a question",
    "name": "StudentAnswerQuestion",
    "group": "Student",
    "examples": [
      {
        "title": "Example usage:",
        "content": "Example usage:\n  PUT /v1/user/the-users-unique-id\n  {\n    \"value\": \"The value\"\n  }\n",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "qid",
            "optional": false,
            "description": "<p>The id of the question being answered</p>"
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
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n   {\n     \"success\": true,\n     \"answer\": {\n       \"student\": \"the-student-id\",\n       \"question\": \"the-question-id\",\n       \"value\": \"the-answer\"\n     }\n   }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/student.js"
  },
  {
    "type": "post",
    "url": "/v1/student/:uvid/login",
    "title": "Log a student in",
    "name": "StudentLogin",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "id",
            "optional": false,
            "description": "<p>The Student&#39;s UVID</p>"
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
            "field": "student",
            "optional": false,
            "description": "<p>The student object.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "student.id",
            "optional": false,
            "description": "<p>The student&#39;s unique id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "student.uvid",
            "optional": false,
            "description": "<p>The student&#39;s UVID</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "student.createdAt",
            "optional": false,
            "description": "<p>The date the student was created.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "student.updatedAt",
            "optional": false,
            "description": "<p>The date the student was updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n   {\n     \"success\": true,\n     \"student\": {\n       \"id\": \"the-unique-id\",\n       \"uvid\": \"10283774\",\n       \"createdAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST),\n       \"updatedAt\": Sat Nov 15 2014 08:23:19 GMT-0700 (MST)\n     }\n   }\n",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/v1/student.js"
  },
  {
    "type": "post",
    "url": "/v1/student/logout",
    "title": "Log a student out",
    "name": "StudentLogout",
    "group": "Student",
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
    "filename": "routes/v1/student.js"
  },
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
        "content": "Example usage:\n  POST /v1/user\n  {\n    \"email\": \"newemail@email.com\",\n    \"role\": \"user\",\n    \"password\": \"newPassword\"\n  }\n",
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
        "content": "Example usage:\n  PUT /v1/user/the-users-unique-id\n  {\n    \"email\": \"newemail@email.com\",\n    \"role\": \"user\",\n    \"password\": \"newPassword\"\n  }\n",
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