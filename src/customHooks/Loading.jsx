import { useState } from "react"

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoadingHandler = () => setIsLoading(true)
    const stopLoadingHandler = () => setIsLoading(false)


    return {isLoading, startLoadingHandler, stopLoadingHandler}
}