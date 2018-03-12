package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("../webapp/build"))
	http.Handle("/", fs)

	manager := Chat{clients: make(map[ClientTransport]int)}
	wh := NewWebsocketHandler(&manager)

	http.Handle("/ws", wh)

	addr := fmt.Sprintf(":%s", getEnv("PORT", "8080"))
	log.Printf("Starting server at %s...", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}
