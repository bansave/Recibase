export const Search = (text) =>{
    console.log(text);
    console.log('ini action Creator Test Text')
    return { type: 'Search', payload: text};
};