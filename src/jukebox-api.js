/**
 * Primary API entry point containing command router and Roll20 Event listeners
 *
 * @module jukebox/api
 *
 * @author Draico Dorath
 * @copyright 2020
 * @license MIT
 */

import {version} from "../package.json";
import {start, stop} from "./jukebox-playlist";

// API Command prefix
const prefix = "jukebox-";

// API Command prefix with !
const commandPrefix = `!${prefix}`;

/**
 * Handler method for chat messages
 *
 * @param msg {Object} Roll20 chat message data
 *
 * @returns {void}
 *
 * @private
 * @function route
 */
function route(msg) {
    if (!isCommand(msg)) { return; }

    execute(parseCommand(msg), parseInput(msg));
}

/**
 * Determines whether the given chat message is a valid command
 *
 * @param msg {Object} Roll20 chat message data
 *
 * @returns {Boolean} true if the message is a valid command; false otherwise
 *
 * @private
 * @function isCommand
 */
function isCommand(msg) {
    return (
        (msg.type === "api") &&
        msg.content.startsWith(commandPrefix)
    );
}

/**
 * Parses the API command out of the given Roll20 chat message
 *
 * @param msg {Object} Roll20 chat message data
 *
 * @returns {string} The name of the command to display
 *
 * @private
 * @function parseCommand
 */
function parseCommand(msg) {
    return msg.content
        .split(" ")[0]
        .toLowerCase()
        .replace(commandPrefix, "");
}

/**
 * Strips the command out of the chat message and returns the rest of the input parameters as an
 * Array
 *
 * @param msg {Object} Roll20 chat message
 *
 * @returns {String[]} List of input parameters provided in chat message
 *
 * @private
 * @function parseInput
 */
function parseInput(msg) {
    // Dumb implementation; will break if e.g. needs to accept text strings with spaces in them
    return _.tail(msg.content.split(/\s+/));
}

/**
 * Invokes the given command with the given input on the corresponding route
 *
 * @param command {String} The command to display
 * @param input {String[]} The raw input parameters to pass to the command
 *
 * @returns {void}
 *
 * @private
 * @function execute
 */
function execute(command, input) {
    const routes = {
        "playlist-start": Playlist.start,
        "playlist-stop": Playlist.stop
    };

    if (!(routes[command] && (typeof routes[command] === "function"))) {
        return;
    }

    routes[command](...input);
}

on("chat:message", route);
on("ready", () => {
    log(`[Jukebox] v${version} loaded.`);
});
