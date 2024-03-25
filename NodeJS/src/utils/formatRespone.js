function formatResponse(code, message, count,data) {
    const res = {
        code, message, count, data
    }
    return res;
}
export default formatResponse;