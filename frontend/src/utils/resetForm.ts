type ResetTypeArg = () => void

export const resetForm = (resetFunc: ResetTypeArg) => {
    resetFunc()
}