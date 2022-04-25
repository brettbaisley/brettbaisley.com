# brettbaisley.com
This is the repo to my personal website, brettbaisley.com. There is nothing too fancy here, just a static website.


## Clone Github Repo
To start a new repo on your desktop, run these steps:

1. Open Terminal
2. Run the following commands:
```sh
cd $HOME/code/websites
git clone https://github.com/brettbaisley/brettbaisley.com.git
```


## Ensure Azure Static Web Apps CLI is Installed Globally
Run the following command, if you don't already have Azure 

```sh
cd $HOME/code/websites/brettbaisley.com
npm install -g @azure/static-web-apps-cli
```


## Launch SWA for local development
For local development, all environment variables (or Application Settings as Azure tends to call them), for Azure functions are stored in a `local.settings.json` file in the `api` folder. As this contains secrets, it should be added to `.gitignore` so you don't accidentially check this file in.

See https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local#local-settings-file for more details on the `local.settings.json` file.

```sh
cd $HOME/code/websites/brettbaisley.com/api
swa start ../public --api-location .
```
