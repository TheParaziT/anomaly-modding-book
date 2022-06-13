
deploy:
    git worktree add /tmp/book gh-pages
    mdbook build
    rm -rf /tmp/book/*
    cp -rp book/* /tmp/book/
    cd /tmp/book && \
        git add -A && \
        git commit -m "New version" && \
        git push origin gh-pages