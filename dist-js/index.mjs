import { invoke, transformCallback } from '@tauri-apps/api/tauri';

// Copyright 2019-2023 Tauri Programme within The Commons Conservancy
/**
 * Spawns a process.
 *
 * @ignore
 * @param program The name of the scoped command.
 * @param onEvent Event handler.
 * @param args Program arguments.
 * @param options Configuration for the process spawn.
 * @returns A promise resolving to the process id.
 */
async function execute(onEvent, program, args = [], options) {
    if (typeof args === "object") {
        Object.freeze(args);
    }
    return invoke("plugin:shell|execute", {
        program,
        args,
        options,
        onEventFn: transformCallback(onEvent),
    });
}
/**
 * @since 1.0.0
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class EventEmitter {
    constructor() {
        /** @ignore */
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        this.eventListeners = Object.create(null);
    }
    /**
     * Alias for `emitter.on(eventName, listener)`.
     *
     * @since 1.1.0
     */
    addListener(eventName, listener) {
        return this.on(eventName, listener);
    }
    /**
     * Alias for `emitter.off(eventName, listener)`.
     *
     * @since 1.1.0
     */
    removeListener(eventName, listener) {
        return this.off(eventName, listener);
    }
    /**
     * Adds the `listener` function to the end of the listeners array for the
     * event named `eventName`. No checks are made to see if the `listener` has
     * already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
     * times.
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 1.0.0
     */
    on(eventName, listener) {
        if (eventName in this.eventListeners) {
            // eslint-disable-next-line security/detect-object-injection
            this.eventListeners[eventName].push(listener);
        }
        else {
            // eslint-disable-next-line security/detect-object-injection
            this.eventListeners[eventName] = [listener];
        }
        return this;
    }
    /**
     * Adds a **one-time**`listener` function for the event named `eventName`. The
     * next time `eventName` is triggered, this listener is removed and then invoked.
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 1.1.0
     */
    once(eventName, listener) {
        const wrapper = (arg) => {
            this.removeListener(eventName, wrapper);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            listener(arg);
        };
        return this.addListener(eventName, wrapper);
    }
    /**
     * Removes the all specified listener from the listener array for the event eventName
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 1.1.0
     */
    off(eventName, listener) {
        if (eventName in this.eventListeners) {
            // eslint-disable-next-line security/detect-object-injection
            this.eventListeners[eventName] = this.eventListeners[eventName].filter((l) => l !== listener);
        }
        return this;
    }
    /**
     * Removes all listeners, or those of the specified eventName.
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 1.1.0
     */
    removeAllListeners(event) {
        if (event) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete,security/detect-object-injection
            delete this.eventListeners[event];
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.eventListeners = Object.create(null);
        }
        return this;
    }
    /**
     * @ignore
     * Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
     * to each.
     *
     * @returns `true` if the event had listeners, `false` otherwise.
     */
    emit(eventName, arg) {
        if (eventName in this.eventListeners) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,security/detect-object-injection
            const listeners = this.eventListeners[eventName];
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            for (const listener of listeners)
                listener(arg);
            return true;
        }
        return false;
    }
    /**
     * Returns the number of listeners listening to the event named `eventName`.
     *
     * @since 1.1.0
     */
    listenerCount(eventName) {
        if (eventName in this.eventListeners)
            // eslint-disable-next-line security/detect-object-injection
            return this.eventListeners[eventName].length;
        return 0;
    }
    /**
     * Adds the `listener` function to the _beginning_ of the listeners array for the
     * event named `eventName`. No checks are made to see if the `listener` has
     * already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
     * times.
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 1.1.0
     */
    prependListener(eventName, listener) {
        if (eventName in this.eventListeners) {
            // eslint-disable-next-line security/detect-object-injection
            this.eventListeners[eventName].unshift(listener);
        }
        else {
            // eslint-disable-next-line security/detect-object-injection
            this.eventListeners[eventName] = [listener];
        }
        return this;
    }
    /**
     * Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
     * listener is removed, and then invoked.
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 1.1.0
     */
    prependOnceListener(eventName, listener) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wrapper = (arg) => {
            this.removeListener(eventName, wrapper);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            listener(arg);
        };
        return this.prependListener(eventName, wrapper);
    }
}
/**
 * @since 1.1.0
 */
class Child {
    constructor(pid) {
        this.pid = pid;
    }
    /**
     * Writes `data` to the `stdin`.
     *
     * @param data The message to write, either a string or a byte array.
     * @example
     * ```typescript
     * import { Command } from 'tauri-plugin-shell-api';
     * const command = Command.create('node');
     * const child = await command.spawn();
     * await child.write('message');
     * await child.write([0, 1, 2, 3, 4, 5]);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async write(data) {
        return invoke("plugin:shell|stdin_write", {
            pid: this.pid,
            // correctly serialize Uint8Arrays
            buffer: typeof data === "string" ? data : Array.from(data),
        });
    }
    /**
     * Kills the child process.
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async kill() {
        return invoke("plugin:shell|kill", {
            cmd: "killChild",
            pid: this.pid,
        });
    }
}
/**
 * The entry point for spawning child processes.
 * It emits the `close` and `error` events.
 * @example
 * ```typescript
 * import { Command } from 'tauri-plugin-shell-api';
 * const command = Command.create('node');
 * command.on('close', data => {
 *   console.log(`command finished with code ${data.code} and signal ${data.signal}`)
 * });
 * command.on('error', error => console.error(`command error: "${error}"`));
 * command.stdout.on('data', line => console.log(`command stdout: "${line}"`));
 * command.stderr.on('data', line => console.log(`command stderr: "${line}"`));
 *
 * const child = await command.spawn();
 * console.log('pid:', child.pid);
 * ```
 *
 * @since 1.1.0
 *
 */
class Command extends EventEmitter {
    /**
     * @ignore
     * Creates a new `Command` instance.
     *
     * @param program The program name to execute.
     * It must be configured on `tauri.conf.json > tauri > allowlist > shell > scope`.
     * @param args Program arguments.
     * @param options Spawn options.
     */
    constructor(program, args = [], options) {
        super();
        /** Event emitter for the `stdout`. Emits the `data` event. */
        this.stdout = new EventEmitter();
        /** Event emitter for the `stderr`. Emits the `data` event. */
        this.stderr = new EventEmitter();
        this.program = program;
        this.args = typeof args === "string" ? [args] : args;
        this.options = options !== null && options !== void 0 ? options : {};
    }
    /**
     * Creates a command to execute the given program.
     * @example
     * ```typescript
     * import { Command } from 'tauri-plugin-shell-api';
     * const command = Command.create('my-app', ['run', 'tauri']);
     * const output = await command.execute();
     * ```
     *
     * @param program The program to execute.
     * It must be configured on `tauri.conf.json > tauri > allowlist > shell > scope`.
     */
    static create(program, args = [], options) {
        return new Command(program, args, options);
    }
    /**
     * Creates a command to execute the given sidecar program.
     * @example
     * ```typescript
     * import { Command } from 'tauri-plugin-shell-api';
     * const command = Command.sidecar('my-sidecar');
     * const output = await command.execute();
     * ```
     *
     * @param program The program to execute.
     * It must be configured on `tauri.conf.json > tauri > allowlist > shell > scope`.
     */
    static sidecar(program, args = [], options) {
        const instance = new Command(program, args, options);
        instance.options.sidecar = true;
        return instance;
    }
    /**
     * Executes the command as a child process, returning a handle to it.
     *
     * @returns A promise resolving to the child process handle.
     */
    async spawn() {
        return execute((event) => {
            switch (event.event) {
                case "Error":
                    this.emit("error", event.payload);
                    break;
                case "Terminated":
                    this.emit("close", event.payload);
                    break;
                case "Stdout":
                    this.stdout.emit("data", event.payload);
                    break;
                case "Stderr":
                    this.stderr.emit("data", event.payload);
                    break;
            }
        }, this.program, this.args, this.options).then((pid) => new Child(pid));
    }
    /**
     * Executes the command as a child process, waiting for it to finish and collecting all of its output.
     * @example
     * ```typescript
     * import { Command } from 'tauri-plugin-shell-api';
     * const output = await Command.create('echo', 'message').execute();
     * assert(output.code === 0);
     * assert(output.signal === null);
     * assert(output.stdout === 'message');
     * assert(output.stderr === '');
     * ```
     *
     * @returns A promise resolving to the child process output.
     */
    async execute() {
        return new Promise((resolve, reject) => {
            this.on("error", reject);
            const stdout = [];
            const stderr = [];
            this.stdout.on("data", (line) => {
                stdout.push(line);
            });
            this.stderr.on("data", (line) => {
                stderr.push(line);
            });
            this.on("close", (payload) => {
                resolve({
                    code: payload.code,
                    signal: payload.signal,
                    stdout: this.collectOutput(stdout),
                    stderr: this.collectOutput(stderr),
                });
            });
            this.spawn().catch(reject);
        });
    }
    /** @ignore */
    collectOutput(events) {
        if (this.options.encoding === "raw") {
            return events.reduce((p, c) => {
                return new Uint8Array([...p, ...c, 10]);
            }, new Uint8Array());
        }
        else {
            return events.join("\n");
        }
    }
}
/**
 * Opens a path or URL with the system's default app,
 * or the one specified with `openWith`.
 *
 * The `openWith` value must be one of `firefox`, `google chrome`, `chromium` `safari`,
 * `open`, `start`, `xdg-open`, `gio`, `gnome-open`, `kde-open` or `wslview`.
 *
 * @example
 * ```typescript
 * import { open } from 'tauri-plugin-shell-api';
 * // opens the given URL on the default browser:
 * await open('https://github.com/tauri-apps/tauri');
 * // opens the given URL using `firefox`:
 * await open('https://github.com/tauri-apps/tauri', 'firefox');
 * // opens a file using the default program:
 * await open('/path/to/file');
 * ```
 *
 * @param path The path or URL to open.
 * This value is matched against the string regex defined on `tauri.conf.json > tauri > allowlist > shell > open`,
 * which defaults to `^((mailto:\w+)|(tel:\w+)|(https?://\w+)).+`.
 * @param openWith The app to open the file or URL with.
 * Defaults to the system default application for the specified path type.
 *
 * @since 1.0.0
 */
async function open(path, openWith) {
    return invoke("plugin:shell|open", {
        path,
        with: openWith,
    });
}

export { Child, Command, EventEmitter, open };
//# sourceMappingURL=index.mjs.map
