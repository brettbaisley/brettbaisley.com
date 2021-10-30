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


## Create a Pull Request
Click the Github icon and create a pull request. You want to pull the changes in the new branch into the `main` branch.

This action will create a new preview link on Firebase. You can use it to test the changes on Firebase, before commiting them to the main branch.

## Merge Pull Request
Review the pull request from previous step. Test the website in various browsers to ensure it is working as expected.

Once ready, accept and merge the pull request. This will trigger teh Github Action to update the live channel on Firebase, making the changes public.

When asked, delete the branch, so you don't have unused branches lying around.
