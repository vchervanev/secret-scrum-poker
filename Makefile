build_for_linux:
	cd server && GOOS=linux GOARCH=amd64 go build .
push_to_heroku:
	heroku container:push web
open:
	heroku open -asecret-scrum-poker
deploy: build_for_linux push_to_heroku open