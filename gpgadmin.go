package main

import (
	"flag"
	"gpgadmin/config"
	"gpgadmin/server"
	"log"
)

func main() {
	fileName := flag.String("config", "", "Config filename")
	flag.Parse()
	if *fileName == "" {
		log.Fatal("Filename must be specified with --config")
	}
	cfg, err := config.NewConfig(*fileName)
	if err != nil {
		log.Fatal(err)
	}

	svr, err := server.NewServer(cfg)
	if err != nil {
		log.Fatal(err)
	}

	log.Fatal(svr.ListenAndServe())
}
