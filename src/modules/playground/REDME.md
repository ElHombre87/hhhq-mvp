# Playground

This is a playground to test various libraries, components and so on. It is not meant to be a production environment.

Currently testing `xstate` for state management and some `mantine` functionalities and components.

## Modules

### Counter

> A simple controlled counter with value capped between `0` and a `dynamic max`.

State is controlled through an `xstate` machine, input allows to `increase`, `decrease`, set `min` and `max` values
or manually modify the value through clamped input.

#### Issues
* Since the `max` value is dynamically passed down with props, if the value changes the machine does not update
  the context (max value) and everything sort of breaks.

### TODO App

> Classic simple todo app with `xstate` state management and mocked local values in the `/services` folder.

### Temperatures

> Simplest state machine that keeps track and convert temperatures.

### Reddit

> Reddit posts viewer, based on the xstate [tutorial](https://xstate.js.org/docs/tutorials/reddit.html)
> with `react context` and hooks implementation.

