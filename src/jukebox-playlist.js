/**
 * Playlist APIs
 *
 * @module jukebox/playlist
 *
 * @author Draico Dorath
 * @copyright 2020
 * @license MIT
 */

/* Sender of chat messages */
const speakingAs = "Jukebox DJ";

function start(input) {
    log(`start invoked with ${input}`);
    // let playlist = findPlaylistByName(input.join(" "));
    // if (playlist) {
    //     playJukeboxPlaylist(playlist.id);
    // }
}

function stop(input) {
    log(`stop invoked with ${input}`);
    // let playlist = findPlaylistByName(input.join(" "));
    // if (playlist) {
    //     stopJukeboxPlaylist(playlist.id);
    // }
}

/**
 * Finds and returns a Playlist object with the given name
 *
 * @param name {string} name of the Playlist to retrieve
 *
 * @returns {Playlist} Roll20 Playlist Object
 *
 * @private
 */
function findPlaylistByName(name) {
    let playlists = JSON.parse(Campaign().get('jukeboxfolder'));
    return _.find(playlists, (folder) => _.isObject(folder) && folder.n === name);
}

export {
    /**
     * Starts playing a Jukebox Playlist
     *
     * @param name {string} the name of the Jukebox Playlist to start
     *
     * @return {void}
     *
     * @function
     */
    start,
    /**
     * Stops playing a Jukebox Playlist
     *
     * @param name {string} the name of the Jukebox Playlist to stop
     *
     * @return {void}
     *
     * @function
     */
    stop
}
