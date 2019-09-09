package main

import (
	"github.com/sthtnr/go_todo/command"
	"github.com/sthtnr/go_todo/handler"
)

func main() {
	command.Create_table()
	handler.Handler()
}
