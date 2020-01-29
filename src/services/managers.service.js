const BASE_URL = 'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518';

export const getManagers = async() => {
    try{
        const resp = await fetch(`${BASE_URL}/employees.json`);
        const {data} = await resp.json();
        return data;
    } catch(err) {
        console.log('An error occurred while getting managers data', err);
        throw err;
    }
}