
const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min
const chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

export default ()=>'xxxxxxxx-xxxx-xxxx-xxxxxxxxxxxxxxxx'
    .split('')
    .map(v=>v==='-'?v:chars[rand(0,chars.length)])
    .join('')