const { SHOW_LOADER } = require("../types")


const showLoader = (isLoading = false) => {
    return {type: SHOW_LOADER, payload: isLoading}
}

export {
    showLoader
}