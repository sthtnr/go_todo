package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/sthtnr/go_todo/command"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type Todo struct {
	Tasknumber string `json:"task_number"`
	Content    string `json:"content"`
	Deadline   string `json:"deadline"`
}

func Handler() {
	// init router
	r := mux.NewRouter()

	// route handlers / endpoints
	r.HandleFunc("/todo/{task_number}", getTodo).Methods("GET")
	r.HandleFunc("/todo/", getTodos).Methods("GET")
	r.HandleFunc("/todo/", createTodo).Methods("POST")
	r.HandleFunc("/todo/{task_number}", updateTodo).Methods("PUT")
	r.HandleFunc("/todo/{task_number}", deleteTodo).Methods("DELETE")
	r.HandleFunc("/todo/", deleteTodos).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(r)))
	// log.Fatal(http.ListenAndServeTLS(":8000", "https-server.crt", "https-server.key", handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(r)))
}

// get single todo
func getTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	i, err := strconv.Atoi(params["task_number"])
	if err != nil {
		panic(err)
	}
	receiver := command.GetTodo_z(i)
	json.NewEncoder(w).Encode(receiver)
}

// get all todos
func getTodos(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	receiver := command.GetTodos_z()
	json.NewEncoder(w).Encode(receiver)
}

// create a new todo
func createTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var todo Todo
	_ = json.NewDecoder(r.Body).Decode(&todo)
	receiver := command.CreateTodo_z(todo.Content, todo.Deadline)
	json.NewEncoder(w).Encode(receiver)
}

// update todo
func updateTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var todo Todo
	_ = json.NewDecoder(r.Body).Decode(&todo)
	params := mux.Vars(r)
	i, err := strconv.Atoi(params["task_number"])
	if err != nil {
		panic(err)
	}
	receiver := command.UpdateTodo_z(i, todo.Content, todo.Deadline)
	json.NewEncoder(w).Encode(receiver)
}

// delete todo
func deleteTodo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	i, err := strconv.Atoi(params["task_number"])
	if err != nil {
		panic(err)
	}
	command.DeleteTodo_z(i)
}

// delete all todos
func deleteTodos(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	command.DeleteTodos_z()
}
