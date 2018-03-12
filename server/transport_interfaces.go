// transport interfaces for networking abstraction
package main

import (
	"net/http"
)

// ClientNotifier is a writing component of client connection
type ClientNotifier interface {
	send(message string) error
}

// ClientTransport is an interface of client connection
// however reading component is hidden behind event-driven
// architecture inside network server
type ClientTransport interface {
	ClientNotifier
}

// ConnManager is a application logic component to be used by network handler
type ConnManager interface {
	onConnect(transport ClientTransport)
	onDisconnect(transport ClientTransport)
	onMessage(transport ClientTransport, message string)
}

// NetworkHandler is a constructor function for http-based servers to bind
// networking and application layers
type NetworkHandler func (manager ConnManager) http.Handler
