package main

import (
	"fmt"
)

// Chat is test ConnManager implementation
type Chat struct {
	clients map[ClientTransport]int
	maxID   int
}

func (cm *Chat)broadcast(id int, message string){
	for transport, tid := range(cm.clients){
		if id != tid {
			transport.send(message)
		}
	} 
}

func (cm *Chat) onConnect(transport ClientTransport) {
	id := cm.maxID
	cm.maxID++

	cm.clients[transport] = id
	cm.broadcast(id, fmt.Sprintf("%d> joined", id))
	transport.send("Welcome")
}
func (cm *Chat) onDisconnect(transport ClientTransport) {
	id := cm.clients[transport]
	cm.broadcast(id, fmt.Sprintf("%d> disconnected", id))
}
func (cm *Chat) onMessage(transport ClientTransport, message string) {
	id := cm.clients[transport]
	cm.broadcast(id, fmt.Sprintf("%d> %s", id, message))
}