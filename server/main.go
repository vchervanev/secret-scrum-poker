package main

import (
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("../webapp/public"))
	http.Handle("/", fs)

	manager := Chat{clients: make(map[ClientTransport]int)}
	wh := NewWebsocketHandler(&manager)

	http.Handle("/ws", wh)

	http.ListenAndServe(":8080", nil)
}
