# Warbler Server

## Installation of Dependencies

```bash
npm install express bcrypt body-parser mongoose jsonwebtoken cors dotenv --save
```

## Folder Pattern

```bash
mkdir mkdir routes models middleware handlers
```

## Deployment

1. Make sure .git is removed

```bash
rm -rf .git
```

2. Run git init

```bash
git init
```

3. _IMPORTANT_ Add _node_modules_ in .gitignore _IMPORTANT_

4. Create heroku app

```bash
heroku create [name of app]
```

5. Create Git Repo on Github

6. Add Commit and push to git

```bash
git add .
git commit "..."
git push heroku master
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

2. Invalid ELF header issue : perhaps due to node modules being included in git

Solution:

- make sure node_modules is specified in .gitignore file
- if already commit with node modules, run:

```bash
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```

https://github.com/kelektiv/node.bcrypt.js/issues/595
