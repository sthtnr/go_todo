package command

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type Todo_table struct {
	Tasknumber int
	Content    string
	Deadline   string
}

func getEnvVal() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	const (
		host   = os.Getenv("HOST")
		port   = os.Getenv("PORT")
		user   = os.Getenv("USER")
		dbname = os.Getenv("DBNAME")
	)
}

func command() {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+"dbname=%s sslmode=desable", host, port, user, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	// TODO: httpメソッドによってどれを実行するか場合分ける
	// getTodo_z(db)
	// getTodos_z(db)
	// createTodo_z(db, t, c, d)
	// updateTodo_z(db, t, c, d)
	// deleteTodo_z(db, t)
	// defer db.Close()
}

func getTodo_z(db *sql.DB) {
	sqlStatement := `SELECT * FROM todo_table WHERE Tasknumber=$1;`
	var todo Todo_table
	row := db.QueryRow(sqlStatement, 1)
	err := row.Scan(&todo.Tasknumber, &todo.Content, &todo.Deadline)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
		return
	case nil:
		// TODO: id以外の値をフロント側で表示するために返り値としてreturnするようにする。
		fmt.Println(todo)
	default:
		panic(err)
	}
}

func getTodos_z(db *sql.DB) {
	sqlStatement := `SELECT Tasknuber, Content, Deadline FROM todo_table;`
	rows, err := db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	// defer db.Close()
	for rows.Next() {
		var todo Todo_table
		err = rows.Scan(&todo.Tasknumber, &todo.Content, &todo.Deadline)
		if err != nil {
			panic(err)
		}
		// TODO: id以外の値をフロント側で表示するために返り値としてreturnするようにする。
		fmt.Println(todo)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}
}

func createTodo_z(db *sql.DB, t int, c string, d string) {
	sqlStatement := `INSERT INTO todo_table (Tasknumber, Content, Deadline)
	VALUES ($1, $2, $3)
	RETURNING Tasknumber, Content, Deadline;`
	var todo Todo_table
	err := db.QueryRow(sqlStatement, t, c, d).Scan(&todo.Tasknumber, &todo.Content, &todo.Deadline)
	if err != nil {
		panic(err)
	}
	// TODO: id以外の値をフロント側で表示するために返り値としてreturnするようにする。
	fmt.Println(todo)
}

func updateTodo_z(db *sql.DB, t int, c string, d string) {
	sqlStatement := `UPDATE todo_table SET Tasknumber=$1,Content=$2,Deadline=$3
	WHERE Tasknumber = $4
	RETURNING Tasknumber,Content,Deadline;`
	var todo Todo_table
	err := db.QueryRow(sqlStatement, t, c, d).Scan(&todo.Tasknumber, &todo.Content, &todo.Deadline)
	if err != nil {
		panic(err)
	}
	fmt.Println(todo)
}

func deleteTodo_z(db *sql.DB, t int) {
	sqlStatement := `DELETE FROM todo_table WHERE Tasknumber = $1;`
	//  TODO if possible: RowsAffected() を使って実際に削除されたrowがあるかを確認してなかったら
	//  それをUI上で示すような仕組みを作る
	_, err := db.Exec(sqlStatement, t)
	if err != nil {
		panic(err)
	}
}
