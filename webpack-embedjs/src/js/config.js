var env_prod = {
    isDevMode: false,
    apiURL : "https://ai-lab-backend.herokuapp.com/",
    botHost : "https://ai-lab-frontend.herokuapp.com/",
    botURL : "https://ai-lab-frontend.herokuapp.com/mybot/",
    cssURL : "https://ai-lab-frontend.herokuapp.com/assets/css/embed.css"
}

var env_dev = {
    isDevMode: true,
    apiURL : "http://localhost:3000",
    botHost : "http://localhost:4200/",
    botURL : "http://localhost:4200/mybot/",
    cssURL : "http://localhost:4200/assets/css/embed.css"
}

export var env = {
    // ...env_prod,
    ...env_dev,
    iframeId : 'childId',
    botConfig:{}
}