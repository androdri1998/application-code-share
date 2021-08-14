# application-code-sellers
It's a simple back-end application where the user can to register and to share app's codes or marketplace's coupons with another users.  
That API Rest application did was build with technologies as JavaScript at Node.js plataform, the code was wrote in TypeScript using the microframework express. 
  
## Main technologies 
- **TypeScript**: language used to build this back-end application.
- **express**: microframework used to handle API Rest's routes.
- **joi**: used to validade parameters of request.
- **jsonwebtoken**: used to handle with user's login token.
- **multer**: used to handle with upload of files.
- **pg**: used to make connections with postgres database.
- **uuid**: used to generate IDs.
- **jest**: used to make unit tests of all services created on application.
- **eslint**: together with prettier was used to ensure pattern of all code wrote.
- **prettier**: together with eslint was used to ensure pattern of all code wrote.

## Main features
#### Login features
- Login service

#### User features
- Users' list service
- User's register service
- User's update service
- User's remove service
- User's details service

#### Code features
- Code's register service
- Codes' list service
- Code's details service
- Code's remove service
- Code's update service
- Codes' list by users service
- Codes' invalidate service
- Code's update availability service

#### Get code features
- Service to get code to user
- Service to remove code got by user
- Service to list code's details got by user
- Service to list codes got by user
- Service to list codes shared by user

#### Code's comments
- Service to list code's comments
- Service to add a comment at in code
- Service to remove a code
- Service to update a code

## Main dependencies
- cors
- debug
- dotenv
- express
- express-async-errors
- helmet
- http-status-codes
- joi
- jsonwebtoken
- multer
- pg
- uuid  
  
### Dev dependencies  
- @types/cors
- @types/debug
- @types/express
- @types/jest
- @types/jsonwebtoken
- @types/multer
- @types/pg
- @types/uuid
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint
- eslint-config-airbnb-base  
- eslint-config-prettier
- eslint-import-resolver-typescript
- eslint-plugin-import
- eslint-plugin-prettier
- jest
- prettier
- ts-jest
- ts-node-dev
- typescript
