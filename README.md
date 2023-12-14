# CPSC 491 Project - Memoize
## Web Application Project

### Summary
This web application utilizes state- of-the-art AI technology to create content for games using user-generated note cards. The app allows users to create note cards for memorization, which will be used as inputs to the game engine. Game layout will be at the center of the application. Users can nagivate through a game map to segue between tabs and functionality that the app offers.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Tech stack
#### Front End:
> React, Typescript, Tailwind CSS, Shadcn-ui, Kaboom JS(game engine)
#### Back End:
> PlanetScale (Database), Typescript, Prisma, OpenAI DallE

### Detail Functionalities [to be updated]
As of version 0.0.1 a (fractional) work-in-progress deliverables. In this version,
1. User can sign in and authenticate with Google
2. User can generate AI images using OpenAI's DallE GPT 3.5 model
3. User can browse around the game world map (with day and night functions)
4. User can upload and create cards (not yet able to fully see them)
5. Routing between tabs and game world map has been implemented to certain expectation

![Demo 1](/public/demo1.png)

![Demo 2](/public/game_world_night.png)



> For remaining planned works, please refer to project tab of the repository.
> Issues that have been closed, have been tested to meet requirements specified in the documentation.

### Check out the current version on Vercel
```
Copy & paste: https://memoize-rho.vercel.app 
```
or 
```
click the link below the About text on the right
```


### Check out the current version locally

1. Clone the repository to local machine
```
cd [desired local directory]
git clone https://github.com/ptnghia-j/Memoize.git
```

2. Download dependencies required for the application
Either 
```
npm install or
yarn install or 
```
any equivalent command

3. Run the application locally
```
npm run dev
Open [http://localhost:3000](http://localhost:3000) in a browser to see the result.
```

4. Check current automated tests
```
npm test
```

