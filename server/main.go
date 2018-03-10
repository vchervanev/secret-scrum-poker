package main

import (
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("../webapp/public"))
	http.Handle("/", fs)
	http.HandleFunc("/ws", wsHandler)

	http.ListenAndServe(":8080", nil)
}
