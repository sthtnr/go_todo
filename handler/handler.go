package handler

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type Todo struct {
	Tasknumber string `json:"task_number"`
	Content    string `json:"content"`
	Deadline   string `json:"deadline"`
}

// Init todos var as a slice Todo struct
var todos []Todo

func handler() {
	// init router
	r := mux.NewRouter()

	// Mock Data - @todo - implement DB
	todos = append(todos, Todo{Tasknumber: "1", Content: "practice piano hard :3", Deadline: "2019/08/02"})
	todos = append(todos, Todo{Tasknumber: "2", Content: "study english carefully ;>", Deadline: "2019/08/03"})
	todos = append(todos, Todo{Tasknumber: "3", Content: "ｳｵｳｵ ₍₍🐟⁾⁾ ｳｵｳｵ", Deadline: "2019/08/04"})

	// route handlers / endpoints
	r.HandleFunc("/todo-list/", getTodos).Methods("GET")
	r.HandleFunc("/todo-list/{task_number}", getTodo).Methods("GET")
	r.HandleFunc("/todo-list/create-todo", createTodo).Methods("POST")
	r.HandleFunc("/todo-list/update-todo/{task_number}", updateTodo).Methods("PUT")
	r.HandleFunc("/todo-list/delete-todo/{task_number}", deleteTodo).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", r))
}

// get all todos
func getTodos(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todos)
}

// get single todo
func getTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r) // get params
	// loop through todos and find with id
	for _, item := range todos {
		if item.Tasknumber == params["task_number"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
}

// create a new todo
func createTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var todo Todo
	_ = json.NewDecoder(r.Body).Decode(&todo)
	todo.Tasknumber = strconv.Itoa(rand.Intn(1000000)) // Mock ID - @todo 連番で割り振られるようにする
	todos = append(todos, todo)
	json.NewEncoder(w).Encode(todo)
}

// update todo
func updateTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range todos {
		if item.Tasknumber == params["task_number"] {
			todos = append(todos[:index], todos[index+1:]...)
			var todo Todo
			_ = json.NewDecoder(r.Body).Decode(&todo)
			todo.Tasknumber = params["task_number"]
			todos = append(todos, todo)
			json.NewEncoder(w).Encode(todo)
			return
		}
	}
	json.NewEncoder(w).Encode(todos)
}

// delete todo
func deleteTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range todos {
		if item.Tasknumber == params["task_number"] {
			todos = append(todos[:index], todos[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(todos)
}
