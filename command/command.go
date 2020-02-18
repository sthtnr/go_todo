package command

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

type Todo_table struct {
	Id       int    `json:"id"`
	Content  string `json:"content"`
	Deadline string `json:"deadline"`
}

var (
	host     = os.Getenv("HOST")
	port     = os.Getenv("PORT")
	user     = os.Getenv("USER")
	password = os.Getenv("PASSWORD")
	dbname   = os.Getenv("DBNAME")
)

var psqlInfo = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

func GetTodo_z(ts int) Todo_table {
	return Todo_table{1, "hogehoge", "2020/02/17"}
}

func GetTodos_z() []Todo_table {
	fmt.Println(psqlInfo)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `SELECT Id, Content,
									TO_CHAR(Deadline, 'HH24:MI') FROM todo_table;`
	var todos []Todo_table
	rows, err := db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	for rows.Next() {
		var todo Todo_table
		err = rows.Scan(&todo.Id, &todo.Content, &todo.Deadline)
		if err != nil {
			panic(err)
		}
		todos = append(todos, todo)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}
	return todos
}

func CreateTodo_z(c string, d string) Todo_table {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `INSERT INTO todo_table (Content, Deadline)
	VALUES ($1, $2)
	RETURNING Id, Content, TO_CHAR(Deadline, 'HH24:MI');`
	var todo Todo_table
	err = db.QueryRow(sqlStatement, c, d).Scan(&todo.Id, &todo.Content, &todo.Deadline)
	if err != nil {
		panic(err)
	}
	return todo
}

func UpdateTodo_z(t int, c string, d string) Todo_table {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `UPDATE todo_table SET Content=$2, Deadline=$3
	WHERE Id = $1
	RETURNING Id, Content, TO_CHAR(Deadline, 'HH24:MI');`
	var todo Todo_table
	err = db.QueryRow(sqlStatement, t, c, d).Scan(&todo.Id, &todo.Content, &todo.Deadline)
	if err != nil {
		panic(err)
	}
	return todo
}

func DeleteTodo_z(t int) {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `DELETE FROM todo_table WHERE Id = $1;`
	_, err = db.Exec(sqlStatement, t)
	if err != nil {
		panic(err)
	}
}

func DeleteTodos_z() {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `DELETE FROM todo_table;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}
}
