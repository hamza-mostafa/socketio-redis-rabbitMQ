class responseParser {
    //given that the message response interface is
    //{
    //   "data":{},
    //   "response_status":(2xx,3xx,4xx,5xx),
    //   "operation_status":(success,failure),
    //   "error":"error message "
    // }
    static parse(response_message) {
        const result = JSON.parse(response_message);
        console.log(result);
        let status = result.response_status;
        let data = result.operation_status?result.data:{"error":result.error};
        return {data,status};
    }
}

module.exports = responseParser;