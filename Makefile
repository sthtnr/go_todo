build:
	go build -o todo_app main.go
run: build
	./todo_app