export const getPaginationData = <T>(
    items: Array<T>,
    pageNumber: number
): {
    items: Array<T>
    page: number
    pageCount: number
} => {
    const workersCount = items.length
    const perPage = 30
    const pageCount = Math.ceil(workersCount / perPage)

    let page = pageNumber
    if (page < 1) page = 1
    if (page > pageCount) page = pageCount
    const from = perPage * (page - 1)
    let to = perPage * page

    return {
        items: items.slice(from, to),
        page,
        pageCount
    }
}
