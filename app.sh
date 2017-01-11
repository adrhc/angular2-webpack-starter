#!/usr/bin/env bash

shopt -s expand_aliases
source ~/.bash_aliases

ADRHC_SSH_PORT=443

# cp -rv dist/* ~/apps/opt/apache-htdocs/a2ws/
deploy() {
	local DEPLOY_REMOTE="$1"
	if [ "$DEPLOY_REMOTE" == "deploy" ]; then
		DEPLOY_REMOTE="$2"
	fi
	if [[ "$DEPLOY_REMOTE" == "remote" || "$DEPLOY_REMOTE" == "r" || "$DEPLOY_REMOTE" == "y" ]]; then
		rsync -cEhikLmrt --progress --delete-after --delete-excluded dist/ -e "ssh -p $ADRHC_SSH_PORT" adr@adrhc.go.ro:/home/adr/apps/opt/apache-htdocs/a2ws
	else
		rsync -cEhikLmrt --progress --delete-after --delete-excluded dist/ ~/apps/opt/apache-htdocs/a2ws
	fi
}

clean() {
	npm run clean:aot
	npm run clean:dist
}

dev() {
	buildDev
}

buildDev() {
	npm run build:dev
}

prod() {
	buildProd
}

buildProd() {
	npm run build:prod
}

aot() {
	npm run build:aot:prod
}

aotDeploy() {
	aot
	deploy "$@"
}

prodDeploy() {
	buildProd
	deploy "$@"
}

gomAotDeploy() {
	git pull origin master
	aotDeploy "$@"
}

gomAotDeployr() {
	gomAotDeploy remote
}

gomProdDeploy() {
	git pull origin master
	prodDeploy "$@"
}

scripts() {
	# search modules having webpack in peerDependencies
	find node_modules/ -type f -name package.json -exec grep -A3 -nHr peerDependencies {} \; | grep -i "\"webpack\":"
}

$1 "$@"
