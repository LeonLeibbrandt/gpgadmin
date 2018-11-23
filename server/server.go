package server

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"gpgadmin/config"
	"net/http"
)

type Server struct {
	http.Server
}

func NewServer(c *config.Config) (*Server, error) {
	s := &Server{}
	r := mux.NewRouter()
	fmt.Println(http.Dir(c.RootDir))
	r.HandleFunc("/tree/", s.handleTree).Methods(http.MethodGet)
	r.HandleFunc("/form/{form}", s.handleForm).Methods(http.MethodGet)
	r.PathPrefix("/content/").Handler(http.StripPrefix("/content/", http.FileServer(http.Dir(c.RootDir))))
	r.Handle("/", (http.FileServer(http.Dir(c.RootDir))))

	hs := http.Server{
		Handler: r,
		Addr:    c.Port,
	}

	s.Server = hs

	return s, nil
}

func (s *Server) handleTree(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	result := make(map[string]interface{})
	result["class"] = "branch"
	result["elemname"] = "Servers"
	result["elemtype"] = "Top"
	resultlist := make([]interface{}, 0)
	resultlist = append(resultlist, result)
	fmt.Printf("%v\n", resultlist)
	enc := json.NewEncoder(w)
	enc.Encode(resultlist)
}

func (s *Server) handleForm(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	fmt.Printf("%v\n", vars)
}
