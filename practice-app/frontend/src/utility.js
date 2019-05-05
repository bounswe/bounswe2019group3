function getDomain(){
    if(process.env.NODE_ENV === 'development'){
        return "http://localhost:8080";
    }else{
        return window.location.origin + "/api/";
    }
}


export {getDomain};