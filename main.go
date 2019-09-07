package main

import (
	"github.com/sthtnr/go_todo/command"
	"github.com/sthtnr/go_todo/handler"
)

func main() {
	handler.Handler()
	command.Create_table()
}
