export const updateActiveComponent = (state, payload) => {
    state.activeComponent = payload
}

export const updateGameLap = (state) => {
    state.gameLap -= 1;
}

export const resetGameLap = (state) => {
    state.gameLap = 3;
}