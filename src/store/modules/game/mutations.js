export const resetSelectedObjects = (state) => {
    state.selectedObjects.clientObjects = [];
    state.selectedObjects.computerObjects = [];

    state.points.user = 0;
    state.points.computer = 0;
}