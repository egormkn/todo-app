#!/bin/sh

jq -r '..|.image?|strings' "$(pwd)/webdriverio/selenoid/browsers.json" | xargs -I{} docker pull {}
docker run -d --rm --name selenoid -p 4444:4444         \
    -v "/var/run/docker.sock:/var/run/docker.sock"      \
    -v "$(pwd)/webdriverio/selenoid/:/etc/selenoid/:ro" \
    --add-host="host.docker.internal:host-gateway"      \
    aerokube/selenoid:latest-release                    \
    -conf /etc/selenoid/browsers.json
docker run -d --rm --name selenoid-ui -p 8080:8080      \
    --link selenoid                                     \
    aerokube/selenoid-ui --selenoid-uri=http://selenoid:4444
