# opentmi-cli
Command line interface for OpenTMI

## Installation

```
npm i -g git+https://git@github.com/opentmi/opentmi-cli.git
```

## Usage

**Login:**
```
$ opentmi-cli login localhost:3000 user password
```
This will fetch authentication token from backend and store
it to `.opentmi` -file as well as host.

**Show backend version:**
```
$ opentmi-cli show version
...
```

**Update opentmi backend version:**
```
$ opentmi-cli update version v1.0.0
...
```

**Logout:**
```
$ opentmi-cli logout
```
This will clean token and host from `.opentmi` -file.


## Help

```
$ opentmi-cli -h
Usage:  <command> [options]

Commands:
  login <host> [username] [password]  Authenticate user
  logout                              Logout user
  show                                Show something from server
  update                              Update something from server

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]

copyright 2018
```
