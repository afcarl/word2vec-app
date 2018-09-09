PREFIX?=$(shell pwd)

all: build

.PHONY: build
build: clean ##
	hugo

.PHONY: server
server: ##
	hugo serve -F -D

.PHONY: clean
clean: ##
	rm -rf public

PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?##.*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?##"; OFS="\t\t"}; {printf "\033[36m%-30s\033[0m %s\n", $$1, ($$2==""?"":$$2)}'
