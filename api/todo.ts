
export async function getTodos() {
    const response = await fetch("/api/todos")
    return response.json()
}