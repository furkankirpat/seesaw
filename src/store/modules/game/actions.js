export const updateUserPoint = ({state}, payload) => {
    state.points.user += payload;
}

export const updateComputerPoint = ({state}, payload) => {
    state.points.computer += payload;
}