package command

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type Todo_table struct {
	Id       int
	Content  string
	Deadline string
}

// var (
// 	host   = os.Getenv("HOST")
// 	port   = os.Getenv("PORT")
// 	user   = os.Getenv("USER")
// 	dbname = os.Getenv("DBNAME")
// )

var (
	host   = "localhost"
	port   = 54320
	user   = "postgres"
	dbname = "my_database"
)

var psqlInfo = fmt.Sprintf("host=%s port=%d user=%s "+"dbname=%s sslmode=disable", host, port, user, dbname)

//TODO: 同scope内でerrが複数箇所あるから２回目以降の宣言時は「:=」でなく「=」にして対処ってなんかおかしくないか...
// func main() {
// 	err := godotenv.Load()
// 	if err != nil {
// 		log.Fatal("Error loading .env file")
// 	}
// }

func Create_table() {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `CREATE TABLE IF NOT EXISTS todo_table
		(
		Id SERIAL,
		Content text NOT NULL,
		Deadline date NOT NULL DEFAULT CURRENT_DATE + 3
		);
		`
	// queries for mock rows
	// INSERT INTO todo_table (Id, Content, Deadline) VALUES (111, 'play game!', '2019-09-10');
	// INSERT INTO todo_table (Id, Content) VALUES (222, 'study math!');
	// INSERT INTO todo_table (Id, Content) VALUES (333, 'write code!');

	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}
}

func GetTodo_z(ts int) Todo_table {
	//TODO: とりあえずpanic()にしてるところをちゃんと実装
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	// sqlStatement := `SELECT * FROM todo_table WHERE Id=$1;`
	sqlStatement := `SELECT Id, Content,
									TO_CHAR(Deadline, 'yyyy/mm/dd HH24:MI') FROM todo_table WHERE Id=$1;`
	var todo Todo_table
	row := db.QueryRow(sqlStatement, ts)
	err = row.Scan(&todo.Id, &todo.Content, &todo.Deadline)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
		panic(err)
	case nil:
		return todo
	default:
		panic(err)
	}
}

func GetTodos_z() []Todo_table {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `SELECT Id, Content,
									TO_CHAR(Deadline, 'yyyy/mm/dd') FROM todo_table;`
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
	RETURNING Id, Content, Deadline;`
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
	RETURNING Id, Content, Deadline;`
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
