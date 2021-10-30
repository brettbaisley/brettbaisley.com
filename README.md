# brettbaisley.com
This is the repo to my personal website, brettbaisley.com. There is nothing too fancy here, just a static website.


## Clone Github Repo
To start a new repo on your desktop, run these steps:

1. Open Terminal

2. Run the following commands:
```
cd /Users/brett/code/websites

git clone <GITHUB_URL>
```


## Initialize Firebase (One-time Setup)
Initial Firebase Hosting, as a one-time setup, and configure Github Actions to push PR's to Firebase.

```
cd /Users/brett/code/websites/<REPO>

firebase init
```

Select this option: `Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`

and then follow the prompts to set up your application.


## Create a Branch
In VSCode, 

1. Click the `main` branch on the bottom-left of the toolbar

2. Select the `Create new branch` option and give the branch a name



## Code the new Branch
With the correct branch selected, make all related code changes that pertain to the new branch.

When finished,

1. Click on the `Source Control` button

2. Stage the files with the changes

3. Enter a commit message, and then click the checkmark to commit

4. Click the `Sync Changes` button to push the changes up to Github


