const MAIN_URL = "https://api.themoviedb.org/3/";

const makeFetchUrl = (path, params = {page: '1'}) => {
    const url = `${MAIN_URL}${path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false`;
    const queryParams = Object.keys(params).map((key) => {
        return `${key}=${params[key]}`;
    });
    return `${url}&${queryParams.join("&")}`;
};
export default makeFetchUrl;