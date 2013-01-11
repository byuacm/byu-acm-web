git filter-branch --env-filter '
 
an="$GIT_AUTHOR_NAME"
am="$GIT_AUTHOR_EMAIL"
cn="$GIT_COMMITTER_NAME"
cm="$GIT_COMMITTER_EMAIL"
 
if [ "1" = "1" ]
then
    cn="Paul Draper"
    cm="paulddraper@gmail.com"
fi
if [ "1" = "1" ]
then
    an="Paul Draper"
    am="paulddraper@gmail.com"
fi
 
export GIT_AUTHOR_NAME="$an"
export GIT_AUTHOR_EMAIL="$am"
export GIT_COMMITTER_NAME="$cn"
export GIT_COMMITTER_EMAIL="$cm"
'