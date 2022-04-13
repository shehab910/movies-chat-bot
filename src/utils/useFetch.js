import useAsync from './useAsync'

export default function useFetch(url, options = {}, dependencies = []) {

  return useAsync(async () => {
      const response = await fetch(url, options);
      if(response.ok){
          return response.json();
      }
      const json = await response.json();
      return Promise.reject(json);
  }, dependencies)
}

