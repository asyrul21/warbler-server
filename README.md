# Warbler Server

## Installation of Dependencies
```bash
npm install express bcrypt body-parser mongoose jsonwebtoken cors dotenv --save
```

## Folder Pattern
```bash
mkdir mkdir routes models middleware handlers
```

# Issues

1. Bcrypt problem:
```bash
dyld: lazy symbol binding failed: Symbol not found: _napi_add_finalizer
  Referenced from: /Users/asyrulhafetzy/Documents/Udemy/AdvancedDeveloperBootcamp/warbler/server/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node
  Expected in: flat namespace

dyld: Symbol not found: _napi_add_finalizer
  Referenced from: /Users/asyrulhafetzy/Documents/Udemy/AdvancedDeveloperBootcamp/warbler/server/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node
  Expected in: flat namespace
```

Solution: 
https://github.com/kelektiv/node.bcrypt.js/issues/792
http://nodejs.org

- either install bcryptjs
- or install older version of bcrypt
