export const mock = (data) => {
    return new Promise(res=>setTimeout(()=>res(data),500))
}