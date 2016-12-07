#!/usr/bin/env bash
# cp -rv dist/* ~/apps/opt/apache-htdocs/a2ws/
rsync -cEhikLmrt --progress --delete-after --delete-excluded dist/ ~/apps/opt/apache-htdocs/a2ws
