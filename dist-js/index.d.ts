/**
 * Options that configure how a child process is spawned.
 *
 * @since 2.0.0
 */
interface SpawnOptions {
    /** Current working directory. */
    cwd?: string;
    /** Environment variables. set to `null` to clear the process env. */
    env?: Record<string, string>;
    /**
     * Character encoding for stdout/stderr
     *
     * @since 2.0.0
     *  */
    encoding?: string;
}
/**
 * The output collected from a child process that ran to completion.
 *
 * @since 2.0.0
 */
interface ChildProcess<O extends IOPayload> {
    /** Exit code of the process. `null` if the process was terminated by a signal on Unix. */
    code: number | null;
    /** If the process was terminated by a signal, represents that signal. */
    signal: number | null;
    /** The data that the process wrote to `stdout`. */
    stdout: O;
    /** The data that the process wrote to `stderr`. */
    stderr: O;
}
/**
 * A minimal event emitter modeled after Node.js' `EventEmitter`, used by
 * {@link Command} and by its `stdout` and `stderr` streams.
 *
 * @since 2.0.0
 */
declare class EventEmitter<E extends Record<string, any>> {
    /** @ignore */
    private eventListeners;
    /**
     * Alias for `emitter.on(eventName, listener)`.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * command.addListener('error', (error) => console.error(error));
     * ```
     *
     * @param eventName The name of the event to listen to.
     * @param listener The callback invoked with the event payload.
     *
     * @returns A reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 2.0.0
     */
    addListener<N extends keyof E>(eventName: N, listener: (arg: E[typeof eventName]) => void): this;
    /**
     * Alias for `emitter.off(eventName, listener)`.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * const listener = (error: string) => console.error(error);
     * command.addListener('error', listener);
     * command.removeListener('error', listener);
     * ```
     *
     * @param eventName The name of the event to stop listening to.
     * @param listener The exact callback that was registered before.
     *
     * @returns A reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 2.0.0
     */
    removeListener<N extends keyof E>(eventName: N, listener: (arg: E[typeof eventName]) => void): this;
    /**
     * Adds the `listener` function to the end of the listeners array for the
     * event named `eventName`. No checks are made to see if the `listener` has
     * already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
     * times.
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * command.on('close', (data) => {
     *   console.log(`command finished with code ${data.code}`);
     * });
     * ```
     *
     * @param eventName The name of the event to listen to.
     * @param listener The callback invoked with the event payload.
     *
     * @returns A reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 2.0.0
     */
    on<N extends keyof E>(eventName: N, listener: (arg: E[typeof eventName]) => void): this;
    /**
     * Adds a **one-time**`listener` function for the event named `eventName`. The
     * next time `eventName` is triggered, this listener is removed and then invoked.
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * command.once('close', (data) => {
     *   console.log(`command finished with code ${data.code}`);
     * });
     * ```
     *
     * @param eventName The name of the event to listen to once.
     * @param listener The callback invoked with the event payload.
     *
     * @returns A reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 2.0.0
     */
    once<N extends keyof E>(eventName: N, listener: (arg: E[typeof eventName]) => void): this;
    /**
     * Removes the all specified listener from the listener array for the event eventName
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * const listener = (error: string) => console.error(error);
     * command.on('error', listener);
     * command.off('error', listener);
     * ```
     *
     * @param eventName The name of the event to stop listening to.
     * @param listener The exact callback that was registered before.
     *
     * @returns A reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 2.0.0
     */
    off<N extends keyof E>(eventName: N, listener: (arg: E[typeof eventName]) => void): this;
    /**
     * Removes all listeners, or those of the specified eventName.
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * command.on('error', (error) => console.error(error));
     * command.removeAllListeners('error');
     * ```
     *
     * @param event The name of the event to remove the listeners of.
     * When omitted, the listeners of every event are removed.
     *
     * @returns A reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 2.0.0
     */
    removeAllListeners<N extends keyof E>(event?: N): this;
    /**
     * Synchronously calls each of the listeners registered for the event named
     * `eventName`, in the order they were registered, passing the supplied arguments
     * to each.
     *
     * @ignore
     *
     * @example
     * ```typescript
     * import { EventEmitter } from '@tauri-apps/plugin-shell';
     * const emitter = new EventEmitter<{ data: string }>();
     * emitter.on('data', (line) => console.log(line));
     * emitter.emit('data', 'hello');
     * ```
     *
     * @param eventName The name of the event to emit.
     * @param arg The payload passed to every registered listener.
     *
     * @returns `true` if the event had listeners, `false` otherwise.
     *
     * @since 2.0.0
     */
    emit<N extends keyof E>(eventName: N, arg: E[typeof eventName]): boolean;
    /**
     * Returns the number of listeners listening to the event named `eventName`.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * command.on('close', () => {});
     * console.log(command.listenerCount('close')); // 1
     * ```
     *
     * @param eventName The name of the event to count the listeners of.
     *
     * @returns The number of listeners registered for the given event.
     *
     * @since 2.0.0
     */
    listenerCount<N extends keyof E>(eventName: N): number;
    /**
     * Adds the `listener` function to the _beginning_ of the listeners array for the
     * event named `eventName`. No checks are made to see if the `listener` has
     * already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
     * times.
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * command.prependListener('error', (error) => console.error(error));
     * ```
     *
     * @param eventName The name of the event to listen to.
     * @param listener The callback invoked with the event payload.
     *
     * @returns A reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 2.0.0
     */
    prependListener<N extends keyof E>(eventName: N, listener: (arg: E[typeof eventName]) => void): this;
    /**
     * Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
     * listener is removed, and then invoked.
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * command.prependOnceListener('error', (error) => console.error(error));
     * ```
     *
     * @param eventName The name of the event to listen to once.
     * @param listener The callback invoked with the event payload.
     *
     * @returns A reference to the `EventEmitter`, so that calls can be chained.
     *
     * @since 2.0.0
     */
    prependOnceListener<N extends keyof E>(eventName: N, listener: (arg: E[typeof eventName]) => void): this;
}
/**
 * A handle to a child process spawned with {@link Command.spawn},
 * which can be used to write to its `stdin` or to kill it.
 *
 * @since 2.0.0
 */
declare class Child {
    /** The child process `pid`. */
    pid: number;
    /**
     * Creates a handle to the child process with the given process id.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * // a `Child` is usually obtained by spawning a command:
     * const child = await Command.create('node').spawn();
     * console.log(child.pid);
     * ```
     *
     * @param pid The process id of the child process.
     *
     * @since 2.0.0
     */
    constructor(pid: number);
    /**
     * Writes `data` to the `stdin`.
     *
     * @param data The message to write, either a string or a byte array.
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * const child = await command.spawn();
     * await child.write('message');
     * await child.write([0, 1, 2, 3, 4, 5]);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     *
     * @since 2.0.0
     */
    write(data: IOPayload | number[]): Promise<void>;
    /**
     * Kills the child process.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * const child = await command.spawn();
     * await child.kill();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     *
     * @since 2.0.0
     */
    kill(): Promise<void>;
}
/**
 * The events emitted by a {@link Command} instance.
 *
 * @since 2.0.0
 */
interface CommandEvents {
    /** Emitted when the child process terminated, carrying its exit code and signal. */
    close: TerminatedPayload;
    /** Emitted when the child process could not be spawned or failed unexpectedly, carrying the error message. */
    error: string;
}
/**
 * The events emitted by the `stdout` and `stderr` streams of a {@link Command}.
 *
 * @since 2.0.0
 */
interface OutputEvents<O extends IOPayload> {
    /** Emitted for each line the process wrote to the stream, or for each raw chunk when the `raw` encoding is used. */
    data: O;
}
/**
 * The entry point for spawning child processes.
 * It emits the `close` and `error` events.
 * @example
 * ```typescript
 * import { Command } from '@tauri-apps/plugin-shell';
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
 * @since 2.0.0
 *
 */
declare class Command<O extends IOPayload> extends EventEmitter<CommandEvents> {
    /** @ignore Program to execute. */
    private readonly program;
    /** @ignore Program arguments */
    private readonly args;
    /** @ignore Spawn options. */
    private readonly options;
    /** Event emitter for the `stdout`. Emits the `data` event. */
    readonly stdout: EventEmitter<OutputEvents<O>>;
    /** Event emitter for the `stderr`. Emits the `data` event. */
    readonly stderr: EventEmitter<OutputEvents<O>>;
    /**
     * @ignore
     * Creates a new `Command` instance.
     *
     * @param program The program name to execute.
     * It must be configured in your project's capabilities.
     * @param args Program arguments.
     * @param options Spawn options.
     */
    private constructor();
    /**
     * Creates a command to execute the given program, decoding its output as text.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('my-app', ['run', 'tauri']);
     * const output = await command.execute();
     * ```
     *
     * @param program The program to execute.
     * It must be configured in your project's capabilities.
     * @param args The arguments to pass to the program. Defaults to no arguments.
     *
     * @returns The command instance, ready to be spawned or executed.
     *
     * @since 2.0.0
     */
    static create(program: string, args?: string | string[]): Command<string>;
    /**
     * Creates a command to execute the given program, keeping its output as raw bytes.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('my-app', ['run', 'tauri'], { encoding: 'raw' });
     * const output = await command.execute();
     * console.log(output.stdout); // a Uint8Array
     * ```
     *
     * @param program The program to execute.
     * It must be configured in your project's capabilities.
     * @param args The arguments to pass to the program. Defaults to no arguments.
     * @param options Spawn options using the `raw` encoding, which makes the process
     * output be delivered as `Uint8Array` instead of `string`.
     *
     * @returns The command instance, ready to be spawned or executed.
     *
     * @since 2.0.0
     */
    static create(program: string, args?: string | string[], options?: SpawnOptions & {
        encoding: 'raw';
    }): Command<Uint8Array>;
    /**
     * Creates a command to execute the given program with the given spawn options.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('my-app', ['run', 'tauri'], { cwd: '/path/to/project' });
     * const output = await command.execute();
     * ```
     *
     * @param program The program to execute.
     * It must be configured in your project's capabilities.
     * @param args The arguments to pass to the program. Defaults to no arguments.
     * @param options Spawn options such as the working directory, the environment
     * variables and the character encoding of the process output.
     *
     * @returns The command instance, ready to be spawned or executed.
     *
     * @since 2.0.0
     */
    static create(program: string, args?: string | string[], options?: SpawnOptions): Command<string>;
    /**
     * Creates a command to execute the given sidecar program, decoding its output as text.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.sidecar('my-sidecar');
     * const output = await command.execute();
     * ```
     *
     * @param program The sidecar program to execute.
     * It must be configured in your project's capabilities
     * and defined on `tauri.conf.json > bundle > externalBin`.
     * @param args The arguments to pass to the program. Defaults to no arguments.
     *
     * @returns The command instance, ready to be spawned or executed.
     *
     * @since 2.0.0
     */
    static sidecar(program: string, args?: string | string[]): Command<string>;
    /**
     * Creates a command to execute the given sidecar program, keeping its output as raw bytes.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.sidecar('my-sidecar', [], { encoding: 'raw' });
     * const output = await command.execute();
     * console.log(output.stdout); // a Uint8Array
     * ```
     *
     * @param program The sidecar program to execute.
     * It must be configured in your project's capabilities
     * and defined on `tauri.conf.json > bundle > externalBin`.
     * @param args The arguments to pass to the program. Defaults to no arguments.
     * @param options Spawn options using the `raw` encoding, which makes the process
     * output be delivered as `Uint8Array` instead of `string`.
     *
     * @returns The command instance, ready to be spawned or executed.
     *
     * @since 2.0.0
     */
    static sidecar(program: string, args?: string | string[], options?: SpawnOptions & {
        encoding: 'raw';
    }): Command<Uint8Array>;
    /**
     * Creates a command to execute the given sidecar program with the given spawn options.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.sidecar('my-sidecar', [], { cwd: '/path/to/project' });
     * const output = await command.execute();
     * ```
     *
     * @param program The sidecar program to execute.
     * It must be configured in your project's capabilities
     * and defined on `tauri.conf.json > bundle > externalBin`.
     * @param args The arguments to pass to the program. Defaults to no arguments.
     * @param options Spawn options such as the working directory, the environment
     * variables and the character encoding of the process output.
     *
     * @returns The command instance, ready to be spawned or executed.
     *
     * @since 2.0.0
     */
    static sidecar(program: string, args?: string | string[], options?: SpawnOptions): Command<string>;
    /**
     * Executes the command as a child process, returning a handle to it.
     *
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const command = Command.create('node');
     * command.stdout.on('data', (line) => console.log(line));
     * const child = await command.spawn();
     * console.log('pid:', child.pid);
     * ```
     *
     * @returns A promise resolving to the child process handle.
     *
     * @since 2.0.0
     */
    spawn(): Promise<Child>;
    /**
     * Executes the command as a child process, waiting for it to finish and collecting all of its output.
     * @example
     * ```typescript
     * import { Command } from '@tauri-apps/plugin-shell';
     * const output = await Command.create('echo', 'message').execute();
     * assert(output.code === 0);
     * assert(output.signal === null);
     * assert(output.stdout === 'message');
     * assert(output.stderr === '');
     * ```
     *
     * @returns A promise resolving to the child process output.
     *
     * @since 2.0.0
     */
    execute(): Promise<ChildProcess<O>>;
}
/**
 * Payload for the `Terminated` command event.
 */
interface TerminatedPayload {
    /** Exit code of the process. `null` if the process was terminated by a signal on Unix. */
    code: number | null;
    /** If the process was terminated by a signal, represents that signal. */
    signal: number | null;
}
/**
 * The type of the data a child process writes to `stdout` and `stderr`:
 * a `string`, or a `Uint8Array` when the `raw` encoding is configured.
 */
type IOPayload = string | Uint8Array;
/**
 * Opens a path or URL with the system's default app,
 * or the one specified with `openWith`.
 *
 * The `openWith` value must be one of `firefox`, `google chrome`, `chromium` `safari`,
 * `open`, `start`, `xdg-open`, `gio`, `gnome-open`, `kde-open` or `wslview`.
 *
 * @example
 * ```typescript
 * import { open } from '@tauri-apps/plugin-shell';
 * // opens the given URL on the default browser:
 * await open('https://github.com/tauri-apps/tauri');
 * // opens the given URL using `firefox`:
 * await open('https://github.com/tauri-apps/tauri', 'firefox');
 * // opens a file using the default program:
 * await open('/path/to/file');
 * ```
 *
 * @param path The path or URL to open.
 * This value is matched against the string regex defined on `tauri.conf.json > plugins > shell > open`,
 * which defaults to `^((mailto:\w+)|(tel:\w+)|(https?://\w+)).+`.
 * @param openWith The app to open the file or URL with.
 * Defaults to the system default application for the specified path type.
 *
 * @since 2.0.0
 */
declare function open(path: string, openWith?: string): Promise<void>;
export { Command, Child, EventEmitter, open };
export type { IOPayload, CommandEvents, TerminatedPayload, OutputEvents, ChildProcess, SpawnOptions };
