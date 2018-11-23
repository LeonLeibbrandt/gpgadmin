package config

import (
	"encoding/json"
	"os"
)

type Config struct {
	Port    string `json:"port"`
	RootDir string `json:"root_dir"`
}

func NewConfig(filename string) (*Config, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	c := &Config{}
	dec := json.NewDecoder(file)
	err = dec.Decode(&c)
	if err != nil {
		return nil, err
	}
	return c, nil
}
