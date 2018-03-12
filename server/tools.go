package main

import "os"

func getEnv(name string, fallback string) (result string) {
	value, exists := os.LookupEnv(name)
	if exists {
		result = value
	} else {
		result = fallback
	}
	return
}
