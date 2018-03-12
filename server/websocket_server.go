package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)


// WebsocketHandler returns http handler to accept websocket connections
// and wrap them into transport handlers
type WebsocketHandler struct{
	manager ConnManager 
}

// NewWebsocketHandler is WebsocketHandler constructor
func NewWebsocketHandler(manager ConnManager) http.Handler{
	return &WebsocketHandler{manager: manager}
}

var upgrader = websocket.Upgrader{}

func (wh *WebsocketHandler)ServeHTTP(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	transport := &WebsocketTransport{conn, wh.manager}
	wh.manager.onConnect(transport)
	go transport.listen()
}
