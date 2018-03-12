package main

import (
	"log"

	"github.com/gorilla/websocket"
)

type WebsocketTransport struct {
	conn    *websocket.Conn
	manager ConnManager
}

func (wt *WebsocketTransport) send(message string) error {
	wt.conn.WriteMessage(websocket.TextMessage, []byte(message))
	return nil
}

func (wt *WebsocketTransport) listen() {
	defer wt.conn.Close()
	for {
		_, message, err := wt.conn.ReadMessage()
		if err != nil {
			wt.manager.onDisconnect(wt)
			log.Println("read error:", err)
			break
		}
		wt.manager.onMessage(wt, string(message))
		log.Printf("received: %s", message)
	}
}
